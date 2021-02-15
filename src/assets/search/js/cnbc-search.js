/* eslint-disable */
var queryly = {};
(function (window) {
    queryly = {
        QuerylyKey: '31a35d40a9a64ab3',
        searchtimer: null,
        searchredirect: '',
        searchapi: '//api.queryly.com',
        redirecturl: '/search/',
        instantSearch: true,


        closesearch: function () {
            document.body.style["overflow-y"] = "auto";
            queryly.search.resetsearch();
            var elem = document.getElementById('back-top-top');
            elem.parentNode.removeChild(elem);
        },

        initalize: function () {
            queryly.initialize();
        },

        initialize: function () {

            try {
                document.body.style["overflow-y"] = "hidden";

                document.getElementById('query_suggest').style["color"] = "black";
                document.getElementById('query').style["opacity"] = "0.7";


                Array.prototype.forEach.call(document.getElementsByClassName('SearchToggle-button'), function (elem) {
                    elem.addEventListener("click", function (event) {
                        queryly.search.resetsearch();
                    });
                });

                if (document.getElementById('searchboxbutton') != null) {
                    document.getElementById('searchboxbutton').addEventListener("click", function (event) {
                        if (document.getElementById('searchbox').value.trim() != '') {
                            //window.location = queryly.redirecturl + "?query=" + document.getElementById('searchbox').value
                        }
                    });
                }

                if (document.getElementById('searchbox') != null) {
                    document.getElementById('searchbox').addEventListener("keydown", function (event) {
                        var keyCode = event.keyCode || event.which;
                        if (keyCode == 13) {
                            if (document.getElementById('searchbox').value.trim() != '') {
                                //window.location = queryly.redirecturl + "?query=" + document.getElementById('searchbox').value
                            }
                        }
                    });
                }

                document.getElementById('query').addEventListener("keyup", function (event) {
                    switch (event.keyCode) {
                        case 37: return;
                        case 38: return;
                        case 39: return;
                        case 40: return;
                    }

                    clearTimeout(queryly.searchtimer);
                    queryly.search.waitForReturn = false;
                    //generate the full query string based on keyword predication.

                    var current_query = document.getElementById('query').value;
                    if (current_query == '') {
                        queryly.search.resetsearch();
                        queryly.search.dopresearch();
                        event.preventDefault();
                        return;
                    }



                    var full_suggest = queryly.search.getFullSuggestion();
                    if ((full_suggest == '') || (full_suggest.indexOf(current_query.toLowerCase()) != 0)) {
                        //document.getElementById('searchcontainer').innerHTML = "";
                        queryly.search.facetedkey = []
                        queryly.search.facetedvalue = [];
                        queryly.util.showAnimation(true);
                        queryly.searchtimer = setTimeout("queryly.search.doAdvancedSearch(1);", 300);
                        if (document.getElementById('formatfilter') != null) {
                            document.getElementById('formatfilter').selectedIndex = 0;
                        }
                    }

                });

                //handle tab key and space key on search box
                document.getElementById('query').addEventListener("keydown", function (event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode == 9) {
                        event.preventDefault();
                        var result = queryly.search.getFullSuggestion();
                        if (result != '') {
                            document.getElementById('query').value = result;
                            document.getElementById('query').focus();
                        }
                    }
                    else if (keyCode == 32) {
                        queryly.search.current_suggestion = "";
                    }
                    else if (keyCode == 13) {
                            queryly.search.enterkeypressed();
                            //window.location = queryly.redirecturl + "?query=" + encodeURIComponent(fullsuggest);
                    }
                });



                //handle copy-and-paste words into search box
                document.getElementById('query').addEventListener("input propertychange paste", function () {
                    clearTimeout(queryly.searchtimer);
                    queryly.search.waitForReturn = false;

                    if (document.getElementById('query').value == '') {
                        queryly.search.resetsearch();
                        return;
                    }
                    else {
                        queryly.util.showAnimation(true);
                        queryly.searchtimer = setTimeout("queryly.search.doAdvancedSearch(1);", 300);
                    }
                });

                document.getElementById('query').addEventListener("click", function (event) {
                    var result = queryly.search.getFullSuggestion();
                    if (result != '') {
                        document.getElementById('query').value = result;
                    }
                });

                Array.prototype.forEach.call(document.getElementsByClassName('Search-submitBtn'), function (elem) {
                    elem.addEventListener("click", function (event) {
                        queryly.search.enterkeypressed();
                    });
                });

                if (document.getElementById("back-top-top") == null) {
                    elem = document.createElement("div");
                    elem.innerHTML = "<span style='z-index:99999' id='back-top-top' onclick='queryly.util.backToTop();' class='icon icon-buffett-backtotop'></span>";
                    document.getElementsByTagName("body")[0].insertBefore(elem, document.getElementsByTagName("body")[0].firstChild)
                }

                if (queryly.instantSearch) {
                    if (window.location.href.toLowerCase().indexOf('mockery.com/search') >= 0) {
                        var sPageURL = window.location.search.substring(1);
                        var sURLVariables = sPageURL.split('&');
                        for (var i = 0; i < sURLVariables.length; i++) {
                            var sParameterName = sURLVariables[i].split('=');
                            if (sParameterName[0].toLowerCase() == 'query') {
                                document.getElementById('query').value = decodeURI(sParameterName[1]);
                                queryly.util.showAnimation(true);
                                queryly.search.doAdvancedSearch(1);
                                return;
                            }
                        }
                        queryly.search.dopresearch();
                    }
                    else {
                        queryly.search.dopresearch();
                    }
                }



            }
            catch (e) { }
        }
    };

    queryly.search = {
        totalpage: 0,
        pagerequested: 0,
        current_suggestion: '',
        current_query: '',
        total: 0,
        batchSize: 10,
        waitForReturn: false,
        sortby: '',
        facetedkey: [],
        facetedvalue: [],
        current_tickers: [],

        resetsearch: function () {
            document.getElementById('MainContent').style['display'] = 'block';
            window.scrollTo(0, 0);


            queryly.util.showAnimation(false);
            //queryly.instantSearch = false;
            queryly.search.current_suggestion = '';
            queryly.search.current_query = '';
            queryly.search.total = 0;
            if (document.getElementById('query') != null) {
                document.getElementById('query').value = '';
                document.getElementById('query_suggest').value = '';
                //document.getElementById('searchoutercontainer').style['display'] = 'none';
                var elem = document.getElementById('searchwaitmessage');
                if (elem != null) { elem.parentNode.removeChild(elem); }
            }


        },

        enterkeypressed: function(){
            var knowntickers = ['.atg', '.jkse', '.klse', '.omxhpi', '.nz50', '.ssmi', '.obx', '.ipsa', '.indx', '.ibc', 'krw=', 'nzd=', 'usd='];
            var currentq = document.getElementById('query').value.trim();
            if (currentq == '') {
                return;
            }
            if (queryly.util.containTickers(currentq) || knowntickers.indexOf(currentq.toLowerCase()) >= 0 || queryly.search.current_tickers.indexOf(currentq.toLowerCase()) >= 0) {
                window.location = "https://www.mockery.com/quotes/?symbol=" + encodeURIComponent(document.getElementById('query').value.trim());
            }
            else {
                document.getElementById('query').blur();
            }
        },

        onscroll: function () {
            if (!queryly.instantSearch || document.getElementById('query').value == '') {
                return;
            }
            if (queryly.search.totalpage <= queryly.search.pagerequested) {
                return;
            }

            if (document.getElementById('searchoutercontainer').style['display'] != 'none') {
                var x = ((window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop) + window.innerHeight;
                var y = document.getElementById('searchcontainer').offsetHeight;


                var totalheight = document.getElementById('searchcontainer').offsetHeight;
                var off = document.getElementById('searchcontainer').getBoundingClientRect().top;
                //var innercontainerheight = document.getElementById('searchoutercontainer').offsetHeight;
                var innercontainerheight = window.innerHeight;
                var delta = totalheight + off - innercontainerheight;
                if (delta < 200) {
                    if (!queryly.search.waitForReturn) {
                        try {
                            queryly.search.waitForReturn = true;
                            queryly.search.doAdvancedSearch(queryly.search.pagerequested + 1);
                        }
                        catch (ex) { queryly.search.waitForReturn = false; }
                    }
                }
            }
        },

        switchsort: function (sortby) {
            queryly.search.sortby = sortby
            queryly.search.doAdvancedSearch(1);
            return false;
        },

        switchformat: function (option) {
            queryly.search.facetedkey = [];
            queryly.search.facetedvalue = [];
            if (option.value != '') {
                queryly.search.facetedkey.push("formats");
                queryly.search.facetedvalue.push(option.value);
            }
            queryly.search.doAdvancedSearch(1);
            return false;
        },

        resetkeyword: function () {
            document.getElementById('keyword').value = '';
        },

        dopresearch: function () {
            var url = queryly.searchapi + "/mockery/json.aspx?queryly_key=" + queryly.QuerylyKey + "&presearch=1";
            queryly.util.callAjax(url, queryly.search.renderPreSearch);

            try {
                var tnames = [];
                var cookievalue = queryly.util.getCookie('savedViewedSymbols');
                if (cookievalue == null || cookievalue == '') {
                    //tnames = ['AAPL', 'MSFT', 'GE', 'T'];
                    var topquotes = "//webql.mockeryfm.com/graphql/?query={mostPopularQuotes(source:parsely%20count:10){assets{issueId%20issuerId%20type%20subType%20name%20exchangeName%20symbol%20altSymbol%20tickerSymbol%20url}}}";
                    queryly.util.callAjax(topquotes, queryly.search.renderPopularQuotes);
                    if (document.querySelector("#tickeroutercontainer h3") != null) {
                        document.querySelector("#tickeroutercontainer h3").innerHTML = 'Popular Symbols';
                    }
                }
                else {
                    var tickers = JSON.parse(cookievalue);
                    for (var i = 0; i < Math.min(10, tickers.length) ; i++) {
                        if (typeof tickers[i].symbolName != 'undefined') {
                            tnames.push(tickers[i].symbolName);
                        }
                    }
                    if (document.querySelector("#tickeroutercontainer h3") != null) {
                        document.querySelector("#tickeroutercontainer h3").innerHTML = 'Recent Symbols';
                    }
                }



                var quoteapi = 'https://quote.mockery.com/quote-html-webservice/quote.htm?&symbols=' + encodeURIComponent(tnames.join('|')) + '&requestMethod=quick&noform=1&exthrs=1&callback=renderTickerQuotes&output=jsonp';
                queryly.util.loadScript(quoteapi, function () {
                });
            }
            catch (e) { }


        },

        doAdvancedSearch: function (pagerequested) {
            var query = document.getElementById('query').value;
            var timeoffset = new Date().getTimezoneOffset();
            var url = queryly.searchapi + "/mockery/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + query + "&endindex=" + Math.max(0, pagerequested - 1) * queryly.search.batchSize + "&batchsize=" + queryly.search.batchSize + "&callback=&showfaceted=true&timezoneoffset=" + timeoffset + "&partners=53cb0e10c84e414f,makeit,5&facetedfields=formats";
            var keys = '';
            var values = ''
            if (queryly.search.facetedkey.length == 0) {
                queryly.search.facetedkey.push("formats");
                queryly.search.facetedvalue.push("!Press Release");
            }

            for (var i = 0; i < queryly.search.facetedkey.length; i++) {
                keys = keys + queryly.search.facetedkey[i] + "|";
                values = values + queryly.search.facetedvalue[i] + "|";
            }

            if (queryly.search.facetedkey.length > 0) {
                url = url + "&facetedkey=" + encodeURIComponent(keys) + "&facetedvalue=" + encodeURIComponent(values);
            }

            if (queryly.search.sortby != '') {
                url = url + '&sort=' + queryly.search.sortby;
            }
            //making the search call to Queryly server
            if (document.getElementById('searchcontainer') != null) {
                document.getElementById('searchcontainer').style['display'] = 'block';
            }

            queryly.util.callAjax(url, queryly.search.renderAdvancedResults);


            if (pagerequested == 1) {
                queryly.search.current_tickers = [];
                //document.getElementById('searchcontainer').innerHTML = "";

                if (queryly.util.containTickers(document.getElementById('query').value)) {
                    var tarray = [];
                    var temps = document.getElementById('query').value.trim().split(',');
                    for (var i = 0; i < temps.length; i++) {
                        if (temps[i].trim() != '') {
                            tarray.push(temps[i].trim());
                        }
                    }
                    renderTickers([], tarray);
                }
                else {
                    var tickerapi = 'https://symlookup.mockery.com/symlookup.do?callback=renderTickers&output=jsonp&prefix=' + encodeURIComponent(query);
                    queryly.util.loadScript(tickerapi, function () {
                    });
                }

                if (document.querySelector("#tickeroutercontainer h3") != null) {
                    document.querySelector("#tickeroutercontainer h3").innerHTML = 'Suggested Symbols';
                }
            }
        },

        //generate a auto-completed keyword based on the search suggestion
        getFullSuggestion: function () {
            var result = '';
            if (document.getElementById('query') != null && queryly.search.current_suggestion != '') {
                var q = document.getElementById('query').value;
                if (q.length > 0) {
                    var lastchar = q.charAt(q.length - 1);
                    var lastword = queryly.util.getLastWord(q);
                    var partialword = queryly.search.current_suggestion.substring(lastword.length);
                    if (lastchar != ' ' && queryly.search.current_suggestion.substring(0, lastword.length) == lastword.toLowerCase()) {
                        result = q + partialword;
                    }
                }
            }
            return result;
        },

        renderFormat: function (results) {
            var selecteditem = "";
            if (queryly.search.facetedvalue.length > 0) {
                selecteditem = queryly.search.facetedvalue[0];
                if (selecteditem != "!Press Release") {
                    return;
                }
            }
            var html = '<select style="font-weight:500;color:#171717;outline:none;font-size:12px;width:100%;cursor:pointer;-moz-appearance:none;min-width:150px;background:white;" onchange="queryly.search.switchformat(this);" id="formatfilter" class="minimal SearchResults-searchResultsSelect"><option value="">All Results</option></label>';
            if (typeof results.filters != 'undefined' && typeof results.filters.formats != 'undefined') {
                var foundPressRelease = false;
                for (var i = 0; i < results.filters.formats.length; i++) {
                    var selected = "";
                    if (results.filters.formats[i].key == selecteditem) { selected = "selected"; }

                    if (results.filters.formats[i].key == "Press Release") {
                        foundPressRelease = true;
                        continue;
                    }
                    html = html + "<option " + selected + " onchange='queryly.search.switchformat(this);' value='" + results.filters.formats[i].key + "'>" + results.filters.formats[i].key + "</option>";
                }

                html = html + "<option " + selected + " onchange='queryly.search.switchformat(this);' value='Press Release'>Press Release</option>";


            }

            html = html + "</select>";
            if (document.getElementById('formatfilter') == null) {
                var elem = document.createElement("div");
                elem.innerHTML = "<label class='SearchResults-resultsFilterGroup'><span class='SearchResults-resultsFilterLabel'>FILTER RESULTS</span>" + html + "<span class='SearchResults-searchResultsSelectIcon icon-arrow-down-readmore'></span>";
                if (document.getElementsByClassName('SearchResults-searchResultsSelectWrapper') != null) {
                    document.getElementsByClassName('SearchResults-searchResultsSelectWrapper')[0].appendChild(elem);
                }
            }
            else {
                document.getElementById('formatfilter').innerHTML = html;
            }
        },

        renderPagination: function (pagerequested, total, batchsize) {
            var html = "";
            if (batchsize < total) {
                html = "<div class='Pagination-pagination Pagination-standardVariant'>";
                var totalpage = Math.ceil(total / batchsize);
                //var currentpage = pagerequested - 1;
                if (pagerequested == 1) {
                    html = html + '<button class="Pagination-paginationArrowDisabled Pagination-paginationArrow icon-arrow-left"></button>';
                }
                else {
                    html = html + '<button onclick="queryly.search.doAdvancedSearch(' + Math.max(1, pagerequested - 1) + ');" class="Pagination-paginationArrow icon-arrow-left"></button>';
                }
                var lowest = Math.max(1, pagerequested - 3);
                var highest = Math.min(totalpage, pagerequested + 3);
                html = html + '<div class="Pagination-paginationNumbers">';
                if (lowest == 1) {
                    if (pagerequested == lowest) {
                        html = html + '<div style="cursor:pointer;" class="Pagination-paginationNumberActive">1</div>';
                    }
                    else {
                        html = html + '<div style="cursor:pointer;" onclick="queryly.search.doAdvancedSearch(1);" class="Pagination-paginationNumber">1</div>';
                    }
                }
                else {
                    html = html + '<div style="cursor:pointer;" onclick="queryly.search.doAdvancedSearch(1);" class="Pagination-paginationNumber">1</div><div class="Pagination-paginationNumber"> - </div>';
                }

                for (var i = lowest; i <= highest; i++) {
                    if (i > 1) {
                        if (i == pagerequested) {
                            html = html + '<div style="cursor:pointer;" class="Pagination-paginationNumberActive">' + pagerequested + '</div>';
                        }
                        else {
                            html = html + '<div style="cursor:pointer;" onclick="queryly.search.doAdvancedSearch(' + (i) + ')" class="Pagination-paginationNumber">' + (i) + '</div>';
                        }
                    }
                }

                if (pagerequested >= Math.ceil(total / batchsize)) {
                    html = html + '</div><button class="Pagination-paginationArrowDisabled Pagination-paginationArrow icon-arrow-right"></button>';
                }
                else {
                    html = html + '</div><button onclick="queryly.search.doAdvancedSearch(' + (pagerequested + 1) + ');" class="Pagination-paginationArrow icon-arrow-right"></button>';
                }
                html = html + "</div>";
            }
            return html;
        },

        renderPreSearch: function (results) {
            try {
                if (document.getElementsByClassName('bars-loading').length > 0) {
                    document.getElementsByClassName('bars-loading')[0].style['display'] = 'none';
                }

                if (document.getElementsByClassName('SearchResults-searchResultsWrapper').length > 0) {
                    document.getElementsByClassName('SearchResults-searchResultsWrapper')[0].setAttribute("style", "display:none;");
                }


                if (typeof results.results == 'undefined' || results.results.length == 0) {
                    document.getElementById('searchcontainer').innerHTML = '';
                    return;
                }

                document.getElementById('searchcontainer').innerHTML = '';

                if (document.getElementById('presearchheader') == null) {
                    var elem = document.createElement("center");
                    elem.innerHTML = '<div id="presearchheader" style="border-top: 1px solid #ccc;margin-bottom: 20px;width: 86%;margin-top:40px;"><div style="display: inline-block;padding-left: 10px;padding-right: 10px;background: white;position: relative;top: -28px;font-size:30px;font-weight:bold;font-weight: bold;color: #444;color:#03557f;">Popular Stories</div></div>';
                    queryly.search.renderSearchContainer(results);
                    document.getElementById('searchcontainer').prepend(elem);
                }

            }
            catch (e) { }

            if (document.getElementById('searchoutercontainer') != null) {
                document.getElementById('searchoutercontainer').style['display'] = 'block';
            }
            //queryly.util.trackClick(document.getElementById('a.externallink'), queryly.util.getVisitorID());
            queryly.search.waitForReturn = false;
        },


        renderPopular: function (results) {
            var profiles = [];
            var shows = [];
            var popularhtml = '';
            var fullsuggest = '';
            try {
                fullsuggest = queryly.search.getFullSuggestion().trim();
                if (fullsuggest == '') {
                    fullsuggest = document.getElementById('query').value.trim();
                }
            }
            catch (e) { }


            if (results.metadata.pagerequested == 1 && typeof results.relatedtags != 'undefined' && results.relatedtags.length > 0) {
                popularhtml = "<style> @media screen and (min-width: 0px) and (max-width: 500px) { #popularcontainer { display:none; } }</style><div class='Topic-container'><h1 class='Topic-header'>More On This Topic</h1>";
                for (var i = 0; i < results.relatedtags.length; i++) {
                    var taghtml = '';
                    if (results.relatedtags[i].results.length == 0) {
                        continue;
                    }
                    var found = false;
                    if (results.relatedtags[i].type == 'topic') {

                        for (var j = 0; j < results.relatedtags[i].results.length; j++) {
                            if (results.relatedtags[i].results[j].name == "Wires" || results.relatedtags[i].results[j].name == "Press Releases") {
                                continue;
                            }
                            found = true;
                            taghtml = taghtml + "<li class='Topic-contentListItem'><a href='" + results.relatedtags[i].results[j].url + "?&qsearchterm=" + fullsuggest + "'>" + results.relatedtags[i].results[j].name + "</a></li>";
                        }

                        if (found) {
                            popularhtml = popularhtml + '<div class="Topic-contentType"><h4 class="Topic-contentTitle">topics</h4><ul class="Topic-contentList">' + taghtml + '</url></div>';
                        }
                    }
                    else if (results.relatedtags[i].type == 'show') {

                        for (var j = 0; j < results.relatedtags[i].results.length; j++) {
                            found = true;
                            taghtml = taghtml + "<li class='Topic-contentListItem'><a href='" + results.relatedtags[i].results[j].url + "?&qsearchterm=" + fullsuggest + "'>" + results.relatedtags[i].results[j].name + "</a></li>";

                            if (results.relatedtags[i].results[j].matchkeyword) {
                                //profiles.push(results.relatedtags[i].results[j]);
                                shows.push(results.relatedtags[i].results[j]);
                            }
                        }
                        if (found) {
                            popularhtml = popularhtml + '<div class="Topic-contentType"><h4 class="Topic-contentTitle">shows</h4><ul class="Topic-contentList">' + taghtml + '</url></div>';
                        }

                    }
                    else if (results.relatedtags[i].type == 'special_report') {

                        for (var j = 0; j < results.relatedtags[i].results.length; j++) {
                            if (results.relatedtags[i].results[j].name == "Special Reports") {
                                continue;
                            }
                            found = true;
                            taghtml = taghtml + "<li class='Topic-contentListItem'><a href='" + results.relatedtags[i].results[j].url + "?&qsearchterm=" + fullsuggest + "'>" + results.relatedtags[i].results[j].name + "</a></li>";
                            //if (results.relatedtags[i].results[j].matchkeyword) {
                            //    //profiles.push(results.relatedtags[i].results[j]);
                            //    shows.push(results.relatedtags[i].results[j]);
                            //}
                        }
                        if (found) {
                            popularhtml = popularhtml + '<div class="Topic-contentType"><h4 class="Topic-contentTitle">special reports</h4><ul class="Topic-contentList">' + taghtml + '</url></div>';
                        }

                    }
                    else if (results.relatedtags[i].type == 'person') {

                        for (var j = 0; j < results.relatedtags[i].results.length; j++) {
                            if (results.relatedtags[i].results[j].name.toLowerCase() == "donald trump") {
                                continue;
                            }
                            if (results.relatedtags[i].results[j].type == "creator") {
                                if (results.relatedtags[i].results[j].matchkeyword) {
                                    profiles.push(results.relatedtags[i].results[j]);
                                }
                            }
                            else {
                                found = true;
                                taghtml = taghtml + "<li class='Topic-contentListItem'><a href='" + results.relatedtags[i].results[j].url + "?&qsearchterm=" + fullsuggest + "'>" + results.relatedtags[i].results[j].name + "</a></li>";
                            }
                        }
                        if (found) {
                            popularhtml = popularhtml + '<div class="Topic-contentType"><h4 class="Topic-contentTitle">people</h4><ul class="Topic-contentList">' + taghtml + '</url></div>';
                        }

                    }
                }
            }

            if (profiles.length == 0 && shows.length > 0) {
                profiles = shows;
            }

            if (profiles.length == 1) {
                queryly.resultdata = {};
                queryly.resultdata['cn:title'] = profiles[0].name;
                queryly.resultdata['cn:liveURL'] = profiles[0].url + "?&qsearchterm=" + fullsuggest;
                queryly.resultdata['description'] = profiles[0].description;
                if (profiles[0].description == '') {
                    queryly.resultdata['description'] = profiles[0].name + "'s profile page";
                }
                queryly.resultdata['cn:promoImage'] = '';
                if (typeof profiles[0].image != 'undefined' && profiles[0].image != '') {
                    queryly.resultdata['cn:promoImage'] = profiles[0].image + '&w=300&h=150';
                }
                if (typeof profiles[0].description != 'undefined') {
                    queryly.resultdata['description'] = profiles[0].description;
                }
                queryly.resultdata['_pubDate'] = '';


                var html = queryly.util.tmpl('queryly_template_mockery', queryly.resultdata);
                var elem = document.createElement("div");
                elem.innerHTML = html;
                document.getElementById('searchcontainer').appendChild(elem);

            }
            return popularhtml;
        },

        partnerMoveRight: function (unit) {
            try {
                var divs = document.getElementsByClassName("CrossPromotionBreaker-crossPromotionalBreakerSlide");   // order: first, second, third
                if (unit == -1) {
                    divs[0].parentNode.insertBefore(divs[divs.length - 1], divs[0]);
                }
                else {
                    divs[0].parentNode.appendChild(divs[0]);
                }
                //divs[2].parentNode.insertBefore(divs[2], divs[0]); // order: third, first, second
                //divs[2].parentNode.insertBefore(divs[2], divs[1]);
            }
            catch (e) { }

        },

        renderSearchContainer: function (results) {


            if (document.getElementsByClassName('bars-loading').length > 0) {
                document.getElementsByClassName('bars-loading')[0].style['display'] = 'none';
            }

            var fullsuggest = '';
            try {
                fullsuggest = queryly.search.getFullSuggestion().trim();
                if (fullsuggest == '') {
                    fullsuggest = document.getElementById('query').value.trim();
                }
            }
            catch (e) { }

            for (var i = 0; i < results.results.length; i++) {
                //add partner results at a spcific positioin if available.
                try {
                    if (typeof results.partners != 'undefined' && results.results[i]._index == 5 && results.partners.length > 0 && results.partners[0].results.length > 0) {
                        var partner_html = '';
                        for (var j = 0; j < results.partners[0].results.length ; j++) {
                            queryly.resultdata = results.partners[0].results[j];
                            if (typeof queryly.resultdata.duration != 'undefined') {
                                var minutes = Math.floor(queryly.resultdata.duration / 60);
                                var secs = queryly.resultdata.duration % 60;
                                if (minutes != 0 || secs != 0) {
                                    if (secs < 10) {
                                        secs = "0" + secs;
                                    }

                                    queryly.resultdata.videoduration = minutes + " : " + secs;
                                }
                            }
                            queryly.resultdata.label = "";
                            queryly.resultdata['cn:liveURL'] = queryly.resultdata['cn:liveURL'] + "?&qsearchterm=" + fullsuggest;
                            queryly.resultdata.description = queryly.resultdata.description.replace(new RegExp("(div|p:)(.*?)>", "gm"), "").replace(/(([^\s]+\s\s*){25})(.*)/, "$1...");
                            if (queryly.resultdata["cn:promoImage"] != '') {
                                //queryly.resultdata["cn:promoImage"] = queryly.resultdata["cn:promoImage"].replace('.1910x1000', '');
                                try {
                                    queryly.resultdata["cn:promoImage"] = "//image.mockeryfm.com/api/v1/image/" + queryly.resultdata["cn:promoImage"].split('/')[queryly.resultdata["cn:promoImage"].split('/').length - 1].replace('.1910x1000', '') + "?w=300&h=150";
                                }
                                catch (e) { }

                            }
                            if (results.partners[0].results.length > 2) {
                                partner_html = partner_html + queryly.util.tmpl('queryly_template_crosspromotion', queryly.resultdata);
                            }
                            else {
                                queryly.resultdata.partnerSectionLabel = '<a style="color: #3b6;font-size: 20px;" href="//www.mockery.com/make-it/"><img src="//www.queryly.com/images/MakeIt-logo.svg"/></a>';
                                partner_html = partner_html + queryly.util.tmpl('queryly_template_mockery', queryly.resultdata);
                            }

                        }
                        var elem = document.createElement("div");
                        if (results.partners[0].results.length > 2) {
                            elem.innerHTML = '<div style="margin-top:0px;margin-bottom:30px;" class="BuffettSearchResults-searchResultsBreaker"><div><div class="CrossPromotionBreaker-crossPromotionalBreaker"><div class="CrossPromotionBreaker-crossPromotionalBreakerWrapper"><div class="CrossPromotionBreaker-crossPromotionalBreakerTitle">From MOCKERY Make It</div><div class="CrossPromotionBreaker-crossPromotionalBreakerSliderTrack" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div class="CrossPromotionBreaker-crossPromotionalBreakerSlider" style="vertical-align:top; transform:translateX(0px)">' + partner_html + '</div></div><div class="CrossPromotionBreaker-crossPromotionalBreakerArrows"><button style="border:none;" onclick="queryly.search.partnerMoveRight(-1);"  class="CrossPromotionBreaker-crossPromotionalBreakerArrowLeft CrossPromotionBreaker-crossPromotionalBreakerArrowLeft CrossPromotionBreaker-crossPromotionalBreakerArrow icon-buffett-arrow-left-long"></button><button style="border:none;" onclick="queryly.search.partnerMoveRight(1);" class="CrossPromotionBreaker-crossPromotionalBreakerArrowRight CrossPromotionBreaker-crossPromotionalBreakerArrow icon-buffett-arrow-right-long"></button></div></div></div></div></div>';
                        }
                        else {
                            //elem.innerHTML = '<div style="border-top:6px solid #39bb7a;padding-top:30px;"><span style="padding:0px 10px 0px 10px;background: #39bb7a;color: white;font-size: 16px;margin-top: -58px;position: absolute;">From MOCKERY Make It</span>' + partner_html + '</div><div style="border-top: 6px solid #39bb7a;margin-top: -31px;position: relative;margin-bottom: 30px;"></div>';
                            elem.innerHTML = partner_html;
                        }

                        document.getElementById('searchcontainer').appendChild(elem);

                        var links = document.querySelectorAll(".CrossPromotionBreaker-crossPromotionalBreakerSlide a");
                        if (links != null) {
                            for (var k = 0; k < links.length; k++) {
                                if (links[k].href) {
                                    links[k].style.color = '#2077b6';
                                }
                            }
                        }

                    }
                }
                catch (e) { }


                queryly.resultdata = results.results[i];

                //queryly.resultdata['cn:liveURL'] = queryly.resultdata['cn:liveURL'].replace("//www.", "//qa-aws05web.");
                queryly.resultdata['cn:liveURL'] = queryly.resultdata['cn:liveURL'] + "?&qsearchterm=" + fullsuggest;

                if (i == results.results.length - 1 || (typeof results.partners != 'undefined' && results.results[i]._index == 4 && results.partners.length > 0 && results.partners[0].results.length > 2)) {
                    queryly.resultdata.lastrow = true;
                }

                queryly.resultdata.label = '';
                if (queryly.resultdata["cn:promoImage"] != '') {
                    queryly.resultdata["cn:promoImage"] = queryly.resultdata["cn:promoImage"] + '&w=300&h=150';
                }

                queryly.resultdata['cn:title'] = queryly.resultdata['cn:title'].replace(/(([^\s]+\s\s*){15})(.*)/, "$1...");
                queryly.resultdata['cn:title'] = queryly.util.highlight(queryly.resultdata['cn:title'], results.metadata.stems);
                queryly.resultdata.description = queryly.resultdata.description.replace(/(([^\s]+\s\s*){25})(.*)/, "$1...")
                queryly.resultdata.description = queryly.util.highlight(queryly.resultdata.description, results.metadata.stems);

                if (typeof queryly.resultdata.duration != 'undefined') {
                    var minutes = Math.floor(queryly.resultdata.duration / 60);
                    var secs = queryly.resultdata.duration % 60;
                    if (minutes != 0 || secs != 0) {
                        if (secs < 10) {
                            secs = "0" + secs;
                        }

                        queryly.resultdata.videoduration = minutes + ":" + secs;
                    }
                }

                try {
                    if (typeof queryly.resultdata.author != 'undefined' && queryly.resultdata.author != '' && typeof results.resources != 'undefined') {
                        for (var j = 0; j < results.resources.length; j++) {
                            if (results.resources[j].group == 'creator') {
                                for (var k = 0; k < results.resources[j].results.length; k++) {
                                    if (queryly.resultdata.author.toLowerCase() == results.resources[j].results[k].name.toLowerCase()) {
                                        queryly.resultdata.authorurl = results.resources[j].results[k].url + "?&qsearchterm=" + fullsuggest;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                catch (e) { }

                try {
                    if (typeof queryly.resultdata.section != 'undefined' && queryly.resultdata.section != '' && typeof results.resources != 'undefined') {
                        for (var j = 0; j < results.resources.length; j++) {
                            if (results.resources[j].group == 'section' || results.resources[j].group == 'franchise') {
                                for (var k = 0; k < results.resources[j].results.length; k++) {
                                    if (queryly.resultdata.section.toLowerCase() == results.resources[j].results[k].name.toLowerCase()) {
                                        queryly.resultdata.sectionurl = results.resources[j].results[k].url + "?&qsearchterm=" + fullsuggest;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                catch (e) { }

                try {
                    var html = queryly.util.tmpl('queryly_template_mockery', queryly.resultdata)
                    var elem = document.createElement("div");
                    elem.innerHTML = html;
                    document.getElementById('searchcontainer').appendChild(elem);

                    if (!queryly.instantSearch && i == 3 && document.getElementById('dart_wrapper_boxsearchinline_') == null) {
                        elem = document.createElement("div");
                        elem.innerHTML = "<div id='dart_wrapper_boxsearchinline_' class='SearchOverlay-adContainer'/>";
                        document.getElementById('searchcontainer').appendChild(elem);
                    }
                }
                catch (e) { }
            }
        },

        renderPopularQuotes: function (quotes) {
            try {
                var tname = [];
                if (quotes.data.mostPopularQuotes.assets.length > 0) {
                    for (var i = 0; i < quotes.data.mostPopularQuotes.assets.length; i++) {
                        if (quotes.data.mostPopularQuotes.assets[i].name != null) {
                            tname.push(quotes.data.mostPopularQuotes.assets[i].symbol);
                        }
                    }
                }

                var quoteapi = 'https://quote.mockery.com/quote-html-webservice/quote.htm?&symbols=' + encodeURIComponent(tname.join('|')) + '&requestMethod=quick&noform=1&exthrs=1&callback=renderTickerQuotes&output=jsonp';
                queryly.util.loadScript(quoteapi, function () {
                });
            }
            catch (e) { }
        },

        renderAdvancedResults: function (results) {

            queryly.search.current_query = results.metadata.q;
            queryly.search.current_suggestion = '';
            queryly.search.total = results.metadata.totalresults;
            queryly.search.totalpage = results.metadata.totalpage;
            queryly.search.pagerequested = results.metadata.pagerequested;



            if (typeof results.metadata.suggestions != 'undefined' && results.metadata.suggestions.length > 0) {
                queryly.search.current_suggestion = results.metadata.suggestions[0];
            }
            document.getElementById('query_suggest').value = queryly.search.getFullSuggestion();



            try {

                if (typeof results.results == 'undefined' || results.results.length == 0) {
                    document.getElementById('searchcontainer').innerHTML = '<div style="margin: 50px;text-align: center;font-size: 30px;color: #444;">No results found. Please search a different keyword.</div>';
                    if (document.getElementsByClassName('SearchResults-searchResultsWrapper').length > 0) {
                        document.getElementsByClassName('SearchResults-searchResultsWrapper')[0].setAttribute("style", "display:none;");
                    }
                    if (document.getElementsByClassName('bars-loading').length > 0) {
                        document.getElementsByClassName('bars-loading')[0].style['display'] = 'none';
                    }
                    document.getElementById('searchoutercontainer').style['display'] = 'block';

                    return;
                }

                if (document.getElementsByClassName('SearchResults-searchResultsWrapper').length > 0) {
                    document.getElementsByClassName('SearchResults-searchResultsWrapper')[0].setAttribute("style", "display:block;");
                }

                if (document.getElementById('sortrelevancydate') != null) {
                    document.getElementById('sortrelevancydate').style['font-weight'] = '700';
                    document.getElementById('sortrelevancydate').style['border-bottom'] = '2px #005594 solid';
                    document.getElementById('sortrelevancydate').style['color'] = '#005594';
                    document.getElementById('sortdate').style['font-weight'] = 'normal';
                    document.getElementById('sortdate').style['color'] = 'black';
                    document.getElementById('sortdate').style['border-bottom'] = 'none';
                    if (queryly.search.sortby != '') {
                        if (queryly.search.sortby == 'date') {
                            document.getElementById('sortrelevancydate').style['font-weight'] = 'normal';
                            document.getElementById('sortrelevancydate').style['color'] = 'black';
                            document.getElementById('sortrelevancydate').style['border-bottom'] = 'none';
                            document.getElementById('sortdate').style['font-weight'] = '700';
                            document.getElementById('sortdate').style['color'] = '#005594';
                            document.getElementById('sortdate').style['border-bottom'] = '2px #005594 solid';
                        }
                    }
                }

                if (queryly.search.pagerequested == 1) {
                    document.getElementById('searchcontainer').innerHTML = "";
                    queryly.search.renderFormat(results);
                }

                if (queryly.search.pagerequested == 1) {
                    try {
                        var popularhtml = queryly.search.renderPopular(results);
                        document.getElementById('popularcontainer').innerHTML = popularhtml;

                        if (document.getElementById('searchresultsamount') != null) {
                            var fullsuggest = queryly.search.getFullSuggestion().trim();
                            if (fullsuggest == '') {
                                fullsuggest = document.getElementById('query').value.trim();
                            }

                            if (results.metadata.corrections.length > 0) {
                                document.getElementById('searchresultsamount').innerHTML = "<style> @media screen and (min-width: 0px) and (max-width: 500px) { .hide-on-mobile {} }</style>" + "0 SEARCH RESULT " + "<div style='display:inline-block;' class='hide-on-mobile'>FOR \"<span>" + fullsuggest + "</span>\"</div><br>" + results.metadata.totalresults + " SEARCH RESULTS " + "<div style='display:inline-block;' class='hide-on-mobile'>FOR \"<span>" + results.metadata.corrections[0] + "</span>\"</div>";
                            }
                            else {
                                document.getElementById('searchresultsamount').innerHTML = "<style> @media screen and (min-width: 0px) and (max-width: 500px) { .hide-on-mobile { display: none!important; } }</style>" + results.metadata.totalresults + " SEARCH RESULTS " + "<div style='display:inline-block;' class='hide-on-mobile'>FOR \"<span>" + fullsuggest + "</span>\"</div>";
                            }
                        }
                    }
                    catch (e) { }
                }


                //loop through the search results.
                queryly.search.renderSearchContainer(results);

                if (document.getElementsByClassName('SearchResults-searchResultsAmount') != null && document.getElementsByClassName('SearchResults-searchResultsAmount').length > 0) {
                    for (var i = 0; i < document.getElementsByClassName('SearchResults-searchResultsAmount').length; i++) {
                        if (results.metadata.corrections.length > 0) {
                            document.getElementsByClassName('SearchResults-searchResultsAmount')[i].innerHTML = "<style> @media screen and (min-width: 0px) and (max-width: 500px) { .hide-on-mobile {} }</style>" + "0 SEARCH RESULTS " + "<div style='display:inline-block;' class='hide-on-mobile'>FOR \"<span>" + queryly.urlQuery.trim() + "</span>\"</div><br>" + results.metadata.totalresults + " SEARCH RESULTS " + "<div style='display:inline-block;' class='hide-on-mobile'>FOR \"<span>" + results.metadata.corrections[0] + "</span>\"</div>";
                        }
                        else {
                            document.getElementsByClassName('SearchResults-searchResultsAmount')[i].innerHTML = "<style> @media screen and (min-width: 0px) and (max-width: 500px) { .hide-on-mobile { display: none!important; } }</style>" + results.metadata.totalresults + " SEARCH RESULTS " + "<div style='display:inline-block;' class='hide-on-mobile'>FOR \"<span>" + queryly.urlQuery.trim() + "</span>\"</div>";
                        }

                    }
                }

            }
            catch (e) { }

            document.getElementById('searchoutercontainer').style['display'] = 'block';
            queryly.util.hookEvent(document.getElementsByClassName('resultlink'), queryly.search.current_query);
            queryly.search.waitForReturn = false;

            queryly.util.trackSearch(queryly.search.current_query, queryly.search.current_suggestion);

            //var paginationhtml = queryly.search.renderPagination(results.metadata.pagerequested, results.metadata.totalresults, results.metadata.pagesize);
            //if (paginationhtml != '') {
            //    var elem = document.createElement("div");
            //    elem.innerHTML = paginationhtml;
            //    document.getElementById('searchcontainer').appendChild(elem);
            //}

            window.scrollTo(0, 0);
        }
    };

    queryly.util = {
        cache: {},
        //used by JavaScript Micro-Templating
        tmpl: function (str, data) {
            var fn = !/\W/.test(str) ?
          this.cache[str] = this.cache[str] ||
            this.tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            str.replace(/[\r\t\n]/g, " ")
               .replace(/'(?=[^%]*%>)/g, "\t")
               .split("'").join("\\'")
               .split("\t").join("'")
               .replace(/<%=(.+?)%>/g, "',$1,'")
               .split("<%").join("');")
               .split("%>").join("p.push('")
               + "');}return p.join('');");

            // Provide some basic currying to the user
            return data ? fn(data) : fn;
        },

        callAjax: function (url, callback) {
            var xmlhttp;
            // compatible with IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    callback(JSON.parse(xmlhttp.responseText));
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        },

        loadScript: function (src, callback) {
            var script = document.createElement('script');
            var loaded = false;
            script.setAttribute('src', src);
            if (callback) {
                script.onreadystatechange = script.onload = function () {
                    if (!loaded) {
                        callback();
                    }
                    loaded = true;
                };
            }
            document.head.appendChild(script);
        },
        //center the image vertically for tall images.
        imageShift: function (img) {
            if (img.naturalHeight > img.naturalWidth * 1.2) {
                var shift = -(img.naturalHeight - img.naturalWidth) / 2;
                (img).style.marginTop = shift + 'px';
            }
        },

        imageLoad: function (img, w, h) {
            if (img.naturalWidth < 20) {
                queryly.util.removeNode(img.parentNode);
            }
        },

        removeNode: function (node) {
            if (node != null && node.parentNode != null) {
                try {
                    node.parentNode.removeChild(node);
                }
                catch (e) { }
            }
        },

        imageError: function (img) {
            img.src = '//www.queryly.com/images/blank.png';
        },

        getUrlParameter: function (name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        },

        getCookie: function (name) {
            try {
                name = name + "=";
                var carray = document.cookie.split(';');

                for (var i = 0; i < carray.length; i++) {
                    var c = carray[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
            }
            catch (ex) {
                return null;
            }
            return null;
        },

        setCookie: function (name, value, days) {
            if (days == undefined) {
                days = 90;
            }
            if (value == 0) {
                document.cookie = name + '=' + value + '; path=/';
            }
            else {
                document.cookie = name + '=' + value + ';expires=' + new Date((new Date().getTime() + 1000 * 24 * 3600 * days)) + '; path=/';
            }
        },

        getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        //generate an anonymous random id
        getVisitorID: function () {
            var id = queryly.util.getCookie("querylyvid");
            if (id == null) {
                id = queryly.util.getRandomInt(1, 2147483647);
                queryly.util.setCookie("querylyvid", id);
            }
            return id;
        },

        //display autocompleted keyword
        showSuggestion: function (guess) {
            if (queryly.currentQuery.length > 0) {
                var lastchar = queryly.currentQuery.charAt(queryly.currentQuery.length - 1);
                var lastword = queryly.util.getLastWord(queryly.currentQuery);
                var partialword = guess.substring(lastword.length);
                if (lastchar != ' ' && queryly.guess.substring(0, lastword.length) == lastword.toLowerCase()) {
                    queryly.suggestbox.value = (queryly.currentQuery + partialword);
                }
                else {
                    queryly.suggestbox.value = (queryly.currentQuery);
                }
            }

        },

        showAnimation: function (show) {
            if (document.getElementsByClassName("bars-loading").length > 0) {
                if (show) {
                    //document.getElementsByClassName("bars-loading")[0].style['display'] = 'block';
                    var i = 0;
                    queryly.util.fadeIn(document.getElementById('searchcontainer'), i);
                }
                else {
                    document.getElementsByClassName("bars-loading")[0].style['display'] = 'none';
                }

            }
        },

        fadeIn: function (el, i) {
            i = i + 0.05;
            queryly.util.seto(el, i);
            if (i < 1) { setTimeout(function () { queryly.util.fadeIn(el, i); }, 10); }
        },

        seto: function (el, i) {
            el.style.opacity = i;
        },

        getLocalDate: function (dt) {
            var lt = dt;
            var offset = new Date().getTimezoneOffset();
            lt.setMinutes(lt.getMinutes() + offset);
            return lt;
        },

        getLocalDateTimeLabel: function (dt) {
            if (dt == '') {
                return dt;
            }
            var jan = new Date(2018, 0, 1);
            var jul = new Date(2018, 6, 1);
            var offset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
            if (offset == 300) {
                return dt + " ET";
            }
            else if (offset == 480) {
                return dt + " PST";
            }
            else {
                return dt;
            }
        },


        getLastWord: function (o) {
            return ("" + o).replace(/[\s]+$/, '').split(/[\s]/).pop();
        },

        highlight: function (text, tokens) {
            var ht = text;
            var existing = [];
            try {

                for (var i = tokens.length - 1 ; i >= 0 ; i--) {
                    if (tokens[i].length < 3) {
                        continue;
                    }
                    var found = false;
                    for (var j = 0; j < existing.length; j++) {
                        if (existing[j].indexOf(tokens[i]) >= 0) {
                            found = true;
                            break;
                        }
                    }

                    if (found) {
                        continue;
                    }
                    existing.push(tokens[i]);
                    var regex = new RegExp(tokens[i], 'gi');
                    ht = ht.replace(regex, function (str) {
                        return "<span style='background-color: #e7ecf1'>" + str + "</span>"
                    })
                }
            }
            catch (e) { }
            return ht;
        },

        autoFillSuggestion: function () {
            var result = queryly.search.getFullSuggestion();
            if (result != '') {
                document.getElementById('query').value = (result);
            }
        },

        trackClick: function (url, q, suggest) {
            new Image().src = "//data.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&query=" + q + "&suggest=" + suggest + "&total=1&target=" + encodeURIComponent(url);
        },

        trackSearch: function (q, suggest) {
            new Image().src = "//data.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&query=" + q + "&suggest=" + suggest + "&total=1&target=";
        },

        hookEvent: function (links) {
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener("mousedown", function () {
                    try {
                        queryly.util.trackClick(this.href.replace(/&amp;/g, "&"), queryly.search.current_query, queryly.search.current_suggestion);
                    }
                    catch (e) { }
                });
            }
        },

        updateClassDiplay: function (classname) {
            var cs = document.querySelectorAll(classname);
            if (cs.length > 0) {
                for (var i = 0; i < cs.length; i++) {
                    if (cs[i].style.display == 'flex') {
                        cs[i].style.display = 'none';
                    }
                    else {
                        cs[i].style.display = 'flex';
                    }
                }

            }
            if (document.getElementById('seemore').innerText == "SEE MORE") {
                document.getElementById('seemore').innerText = "SEE LESS";
                document.getElementById('seemorearrow').classList.remove("arrowexpand");
                document.getElementById('seemorearrow').classList.add("arrowcollapse");
            }
            else {
                document.getElementById('seemore').innerText = "SEE MORE";
                document.getElementById('seemorearrow').classList.remove("arrowcollapse");
                document.getElementById('seemorearrow').classList.add("arrowexpand");
            }
        },

        containTickers: function (keywords) {
            if (keywords.indexOf(',') < 0) {
                return false;
            }
            var temps = keywords.split(',');
            var tickers = [];
            var totallength = 0;
            for (var i = 0; i < temps.length; i++) {
                if (temps[i].trim() != '') {
                    tickers.push(temps[i].trim());
                    totallength = totallength + temps[i].trim().length;
                }
            }

            if ((totallength * 1.0) / tickers.length <= 8) {
                return true;
            }
            return false;

        },

        backToTop: function () {
            document.getElementsByClassName("SearchOverlay-overlayContainer")[0].scrollTop = 0;
            document.getElementById("query").focus();
            queryly.util.autoFillSuggestion();
        }

    };

})(window);

function renderTickers(tickers, tname) {
    if (typeof tname == "undefined" || tname.length == 0) {
        var tkey = [];
        var tvalue = [];
        var tname = [];
        queryly.search.current_tickers = [];
        for (var i = 0; i < tickers.length; i++) {
            if (typeof tickers[i].symbolName == 'undefined') {
                continue;
            }
            try {
                if (tkey.indexOf(tickers[i].issuerId) < 0) {
                    //tkey.push(tickers[i].issuerId);
                    //tvalue.push([]);
                    if (tickers[i].countryCode == 'US') {
                        tname.push(tickers[i].symbolName);
                    }

                }
                if (tkey.indexOf(tickers[i].issuerId) < 0) {
                    //tkey.push(tickers[i].issuerId);
                    //tvalue.push([]);
                    if (tickers[i].countryCode != 'US') {
                        tname.push(tickers[i].symbolName);
                    }

                }
                queryly.search.current_tickers.push(tickers[i].symbolName.toLowerCase());
            }
            catch (e) { }
        }
    }

    var quoteapi = 'https://quote.mockery.com/quote-html-webservice/quote.htm?&symbols=' + encodeURIComponent(tname.join('|')) + '&requestMethod=quick&noform=1&exthrs=1&callback=renderTickerQuotes&output=jsonp';
    queryly.util.loadScript(quoteapi, function () {
    });
}

function renderTickerQuotes(quotes) {
    try {
        if (typeof quotes.QuickQuoteResult.QuickQuote == 'undefined') {
            document.getElementById('tickercontainer').innerHTML = "<span>There are no suggested symbols.</span>";
            return;
        }
        var array = [];
        if (typeof quotes.QuickQuoteResult.QuickQuote.length == 'undefined') {
            array.push(quotes.QuickQuoteResult.QuickQuote);
        }
        else {
            array = quotes.QuickQuoteResult.QuickQuote;
        }
        var elem = document.createElement("div");
        var tickerhtml = '';
        var threshold = 5;
        if (window.innerWidth < 400) {
            threshold = 3;
        }

        var fullsuggest = '';
        try {
            fullsuggest = queryly.search.getFullSuggestion().trim();
            if (fullsuggest == '') {
                fullsuggest = document.getElementById('query').value.trim();
            }
        }
        catch (e) { }

        for (var i = 0; i < Math.min(10, array.length) ; i++) {
            try {
                queryly.tickerdata = array[i];
                //queryly.tickerdata.url = "//qa-pa05pub.mockery.com/quotes/?symbol=" + queryly.tickerdata.symbol + "&qsearchterm=" + queryly.search.current_query;
                queryly.tickerdata.url = "//mockery.com/quotes/?symbol=" + queryly.tickerdata.symbol + "&qsearchterm=" + fullsuggest;
                queryly.tickerdata.symbol = decodeURIComponent(queryly.tickerdata.symbol);
                queryly.tickerdata.change = queryly.tickerdata.change;

                if (queryly.tickerdata.curmktstatus == 'POST_MKT' && typeof queryly.tickerdata.ExtendedMktQuote != 'undefined') {
                    queryly.tickerdata.change = queryly.tickerdata.ExtendedMktQuote.change;
                }
                queryly.tickerdata.changepercentage = parseFloat(queryly.tickerdata.change_pct).toFixed(2);
                if (queryly.tickerdata.curmktstatus == 'POST_MKT' && typeof queryly.tickerdata.ExtendedMktQuote != 'undefined') {
                    queryly.tickerdata.changepercentage = parseFloat(queryly.tickerdata.ExtendedMktQuote.change_pct).toFixed(2);
                }
                queryly.tickerdata.color = '#ccc';
                if (queryly.tickerdata.change > 0) {
                    queryly.tickerdata.color = '#008456';
                }
                else if (queryly.tickerdata.change < 0) {
                    queryly.tickerdata.color = 'red';
                }
                if (i < threshold) {
                    tickerhtml = tickerhtml + queryly.util.tmpl('queryly_template_ticker', queryly.tickerdata);
                }
                else {
                    tickerhtml = tickerhtml + queryly.util.tmpl('queryly_template_ticker', queryly.tickerdata).replace("\"SearchGroup-item\"", "\"SearchGroup-item extratickers\"");
                }

            }
            catch (e) { }

        }
        if (array.length >= threshold) {
            tickerhtml = tickerhtml + "<div style='margin:10px;'><a style='color:#005594;font-weight:bold;font-size:14px;' href='#' onclick='queryly.util.updateClassDiplay(\".extratickers\");'><span style='margin-right:6px;' id='seemore'>SEE MORE</span><span id='seemorearrow' style='font-weight: 400;font-size: 10px; padding: 4px;display: inline-block; vertical-align: sub;' class='icon icon-buffett-backtotop arrowexpand'></span></div>"
        }

        if (document.getElementById('tickercontainer') == null) {
            var elem = document.createElement("div");
            elem.innerHTML = '<div id ="tickercontainer" style="padding: 10px;font-size: 24px;border-bottom: 1px solid #ccc; margin-bottom: 10px;width:30%;position:fixed;" />';
            document.getElementById('searchcontainer').appendChild(elem);
        }
        document.getElementById('tickercontainer').innerHTML = "<style> .extratickers { display:none;} .arrowexpand {transform: rotate(180deg);} .arrowcollapse {transform: rotate(0deg);} </style>" + tickerhtml;
        document.getElementById('tickercontainer').style['display'] = 'block';
        if (document.getElementById('tickeroutercontainer') != null) {
            document.getElementById('tickeroutercontainer').style['display'] = 'block';
        }
    }
    catch (e) { }
}
