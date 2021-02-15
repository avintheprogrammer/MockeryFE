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

        initalize: function () {

            try {


                if (document.getElementById('query') != null) {
                    document.getElementById('query').style['autocorrect'] = 'off';
                    document.getElementById('query').style['autocapitalize'] = 'off';
                    document.getElementById('query').style['autocomplete'] = 'off';
                    document.getElementById('query').style['border-bottom'] = '1px solid #ccc';
                    if (document.getElementById('query_inheader') != null) {
                        document.getElementById('query_inheader').style['autocorrect'] = 'off';
                        document.getElementById('query_inheader').style['autocapitalize'] = 'off';
                        document.getElementById('query_inheader').style['autocomplete'] = 'off';
                        document.getElementById('query_inheader').style['border-bottom'] = '1px solid #ccc';
                    }
                }



                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0].toLowerCase() == 'query') {
                        //queryly.activesearchbox = document.getElementById('query');
                        //document.getElementById('query').value = queryly.urlQuery;
                        if (typeof queryly.urlQuery == 'undefined') {
                            queryly.urlQuery = decodeURIComponent(sParameterName[1].trim()) + ' ';
                            try {
                                if (document.getElementById('searchbox') != null) {
                                    document.getElementById('searchbox').value = decodeURIComponent(sParameterName[1].trim()).trim();
                                }
                            }
                            catch (e) { }

                            queryly.search.doAdvancedSearch(1);
                            queryly.util.trackSearch(queryly.urlQuery);
                            break;
                        }

                    }
                }
            }
            catch (e) { }

            //set up the infinite scrolling of results
            window.onscroll = function () {
                if (!queryly.instantSearch) {
                    return;
                }
                if (queryly.search.totalpage <= queryly.search.pagerequested) {
                    return;
                }



                if (document.getElementById('searchoutercontainer').style['display'] != 'none') {
                    var x = ((window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop) + window.innerHeight;
                    var y = document.getElementById('searchcontainer').offsetHeight;

                    //retrieve next batch if the scroll reaches the bottom of the results.
                    if (x + 160 > y) {
                        if (!queryly.search.waitForReturn) {
                            try {
                                queryly.search.waitForReturn = true;
                                queryly.search.dosearch(queryly.search.pagerequested + 1);
                            }
                            catch (ex) { queryly.search.waitForReturn = false; }
                        }
                    }
                }
            };

            //hook up click on search icon
            //document.getElementById('closebtn').addEventListener('click', function () {
            //    //toggle icon between search icon and close icon.
            //    if (document.getElementById('closebtn').getAttribute('status') == "search") {
            //        document.getElementById('searchbox_container').style['display'] = 'block';
            //        document.getElementById('closebtn').setAttribute('src', '//www.queryly.com/images/whitecloseicon.png');
            //        document.getElementById('closebtn').setAttribute('status', 'close');
            //        document.getElementById('query').focus();
            //    }
            //    else {
            //        document.getElementById('searchbox_container').style['display'] = 'none';
            //        queryly.search.resetsearch();
            //        document.getElementById('closebtn').setAttribute('src', '//www.queryly.com/images/whitesearchicon.png');
            //        document.getElementById('closebtn').setAttribute('status', 'search');
            //    }
            //});

            Array.prototype.forEach.call(document.getElementsByClassName('SearchToggle-button'), function (elem) {
                elem.addEventListener("click", function (event) {
                    queryly.search.resetsearch();
                });
            });

            if (document.getElementById('searchboxbutton') != null) {
                document.getElementById('searchboxbutton').addEventListener("click", function (event) {
                    if (document.getElementById('searchbox').value.trim() != '') {
                        window.location = queryly.redirecturl + "?query=" + document.getElementById('searchbox').value
                    }
                });
            }

            if (document.getElementById('searchbox') != null) {
                document.getElementById('searchbox').addEventListener("keydown", function (event) {
                    var keyCode = event.keyCode || event.which;
                    if (keyCode == 13) {
                        if (document.getElementById('searchbox').value.trim() != '') {
                            window.location = queryly.redirecturl + "?query=" + document.getElementById('searchbox').value
                        }
                    }
                });
            }




            if (document.getElementById('query') == null) {
                return;
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
                var full_suggest = queryly.search.getFullSuggestion();
                var current_query = document.getElementById('query').value;
                if (current_query == '') {
                    queryly.search.resetsearch();
                }
                else if ((full_suggest == '') || (full_suggest.indexOf(current_query.toLowerCase()) != 0)) {
                    //put some pause so that it doesn't fire too freqently.
                    queryly.searchtimer = setTimeout("queryly.search.dosearch(1);", 500);
                    //document.getElementById('closebtn').style['z-index'] = '99999';
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
                    }
                }
                else if (keyCode == 32) {
                    queryly.search.current_suggestion = "";
                }
                else if (keyCode == 13) {
                    if (this.value != '') {
                        var fullsuggest = queryly.search.getFullSuggestion().trim();
                        if (fullsuggest == '') {
                            fullsuggest = document.getElementById('query').value.trim();
                        }
                        window.location = queryly.redirecturl + "?query=" + encodeURIComponent(fullsuggest);
                    }
                }
            });



            //handle copy-and-paste words into search box
            document.getElementById('query').addEventListener("input propertychange", function () {
                clearTimeout(queryly.searchtimer);
                queryly.search.waitForReturn = false;

                if (document.getElementById('query').value == '') {
                    queryly.search.resetsearch();
                    return;
                }
                else {
                    queryly.searchtimer = setTimeout("queryly.search.dosearch(1);", 500);
                }
            });

            document.getElementById('query').addEventListener("click", function (event) {
                var result = queryly.search.getFullSuggestion();
                if (result != '') {
                    document.getElementById('query').value = result;
                }
            });


        }
    };

    queryly.search = {
        totalpage: 0,
        pagerequested: 0,
        current_suggestion: '',
        curent_query: '',
        total: 0,
        batchSize: 10,
        waitForReturn: false,
        sortby: '',
        facetedkey: [],
        facetedvalue: [],

        resetsearch: function () {
            queryly.instantSearch = false;
            queryly.search.current_suggestion = '';
            queryly.search.curent_query = '';
            queryly.search.total = 0;
            if (document.getElementById('query') != null) {
                document.getElementById('query').value = '';
                document.getElementById('query_suggest').value = '';
                document.getElementById('searchoutercontainer').style['display'] = 'none';
                var elem = document.getElementById('searchwaitmessage');
                if (elem != null) { elem.parentNode.removeChild(elem); }

                //document.getElementById('closebtn').style['z-index'] = -1;
                document.getElementById('MainContent').style['display'] = 'block';
                window.scrollTo(0, 0);

                //if (document.body.classList) {
                //    document.body.classList.remove('queryly_searchplus_visible')
                //}

                //if (document.getElementsByTagName('html')[0].classList) {
                //    document.getElementsByTagName('html')[0].classList.remove('queryly_searchplus_visible')
                //}
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

        //main method for calling search api. isNew == true means a brand new search, otherwise, it is a pulling additional results for an existing search
        dosearch: function (pagerequested) {
            queryly.instantSearch = true;
            if (pagerequested == 1) {
                var elem = document.getElementById('nomoreresult');
                if (elem != null) { elem.parentNode.removeChild(elem); }

                queryly.search.total = 0;
                document.getElementById('searchcontainer').innerHTML = '';
                window.scrollTo(0, 0);
            } else {
                if (queryly.search.total > 0 && queryly.search.pagerequested < queryly.search.totalpage) {
                    if (document.getElementById('searchwaitmessage') == null) {
                        var elem = document.createElement("div");
                        elem.innerHTML = '<div id="searchwaitmessage" style="padding:16px;background:#eee;font-weight:bold;text-align:center;">Please wait for additional results...</div>';
                        document.getElementById('searchcontainer').appendChild(elem);
                    }
                }
                else if (queryly.search.total > 0 && queryly.search.pagerequested == queryly.search.totalpage) {
                    if (document.getElementById('nomoreresult') == null) {
                        var elem = document.createElement("div");
                        elem.innerHTML = '<div id="nomoreresult" style="display:none;padding:16px;background:#eee;font-weight:bold;text-align:center;">No more result...</div>';
                        document.getElementById('searchcontainer').appendChild(elem);
                    }
                }
            }
            document.getElementById('MainContent').style['display'] = 'none';
            //document.getElementById('closebtn').style['z-index'] = '99999';

            var query = document.getElementById('query').value;
            //assemble the rest api.
            var url = queryly.searchapi + "/mockery/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + query + "&endindex=" + Math.max(0, pagerequested - 1) * queryly.search.batchSize + "&batchsize=" + this.batchSize + "&callback=&showfaceted=false&timezoneoffset=300&topiccount=10&partners=53cb0e10c84e414f,makeit,5";
            //making the search call to Queryly server
            document.getElementById('MainContent').style['display'] = 'none';
            document.getElementById('searchoutercontainer').style['display'] = 'block';
            queryly.util.callAjax(url, queryly.search.renderResults);

            if (pagerequested == 1) {
                if (document.getElementById('tickercontainer') == null) {
                    var elem = document.createElement("div");
                    elem.innerHTML = '<div id ="tickercontainer" style="padding: 10px;font-size: 24px;border-bottom: 1px solid #ccc; margin-bottom: 10px;width:30%;position:fixed;" />';
                    document.getElementById('searchcontainer').appendChild(elem);
                }
                else {
                    document.getElementById('tickercontainer').innerHTML = "";
                }

                var tickerapi = 'https://symlookup.mockery.com/symlookup.do?callback=renderTickers&output=jsonp&prefix=' + query;
                queryly.util.loadScript(tickerapi, function () {
                });
            }
        },

        doAdvancedSearch: function (pagerequested) {
            queryly.instantSearch = false;
            if (queryly.urlQuery.trim() == '') {
                return;
            }
            var url = queryly.searchapi + "/mockery/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + queryly.urlQuery.trim() + ' ' + "&endindex=" + Math.max(0, pagerequested - 1) * queryly.search.batchSize + "&batchsize=" + queryly.search.batchSize + "&callback=&showfaceted=true&timezoneoffset=300&partners=53cb0e10c84e414f,makeit,5";
            var keys = '';
            var values = ''
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

            //document.getElementById('searchcontainer').innerHTML = "<div><img style='width:100%' src='//www.queryly.com/images/loading.gif'/></div>";
            if (document.getElementsByClassName('bars-loading').length > 0) {
                document.getElementsByClassName('bars-loading')[0].style['display'] = 'block';
            }

            queryly.util.callAjax(url, queryly.search.renderAdvancedResults);

            if (pagerequested == 1) {
                //if (document.getElementById('tickercontainer') == null) {
                //    var elem = document.createElement("div");
                //    elem.innerHTML = '<div id ="tickercontainer" style="padding: 10px;font-size: 24px;border-bottom: 1px solid #ccc; margin-bottom: 10px;width:30%;position:fixed;" />';
                //    document.getElementById('searchcontainer').appendChild(elem);
                //}



                var tickerapi = 'https://symlookup.mockery.com/symlookup.do?callback=renderTickers&output=jsonp&prefix=' + queryly.urlQuery.trim();
                queryly.util.loadScript(tickerapi, function () {
                });
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
            }
            var html = '<label class="SearchResults-resultsFilterGroup"><span class="SearchResults-resultsFilterLabel">FILTER RESULTS</span><select style="font-weight:bold;outline:none;font-size:16px;width:220px;" onchange="queryly.search.switchformat(this);" id="formatfilter" class="minimal SearchResults-searchResultsSelect"><option value="">All Formats</option></label>';
            if (typeof results.filters != 'undefined' && typeof results.filters.formats != 'undefined') {
                for (var i = 0; i < results.filters.formats.length; i++) {
                    var selected = "";
                    if (results.filters.formats[i].key == selecteditem) { selected = "selected"; }

                    html = html + "<option " + selected + " onchange='queryly.search.switchformat(this);' value='" + results.filters.formats[i].key + "'>" + results.filters.formats[i].key + "</option>";
                }
            }
            html = html + "</select>"
            var elem = document.createElement("div");
            elem.innerHTML = html;
            if (document.getElementsByClassName('SearchResults-searchResultsSelectWrapper') != null) {
                document.getElementsByClassName('SearchResults-searchResultsSelectWrapper')[0].appendChild(elem);
            }
        },

        renderPagination: function (pagerequested, total, batchsize) {
            var html = "";
            if (batchsize < total) {
                html = "<div class='Pagination-pagination'>";
                var totalpage = Math.ceil(total / batchsize);
                //var currentpage = pagerequested - 1;
                if (pagerequested == 1) {
                    html = html + '<button class="Pagination-paginationArrowDisabled Pagination-paginationArrow icon-buffett-arrow-left-long"></button>';
                }
                else {
                    html = html + '<button onclick="queryly.search.doAdvancedSearch(' + Math.max(1, pagerequested - 1) + ');" class="Pagination-paginationArrow icon-buffett-arrow-left-long"></button>';
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
                    html = html + '</div><button class="Pagination-paginationArrowDisabled Pagination-paginationArrow icon-buffett-arrow-right-long"></button>';
                }
                else {
                    html = html + '</div><button onclick="queryly.search.doAdvancedSearch(' + (pagerequested + 1) + ');" class="Pagination-paginationArrow icon-buffett-arrow-right-long"></button>';
                }
                html = html + "</div>";
            }
            return html;
        },

        //convert JSON response into HTML and add it on the page.
        renderResults: function (results) {
            queryly.search.total = results.metadata.totalresults;
            queryly.search.totalpage = results.metadata.totalpage;
            queryly.search.pagerequested = results.metadata.pagerequested;

            queryly.search.current_suggestion = '';
            if (typeof results.metadata.suggestions != 'undefined' && results.metadata.suggestions.length > 0) {
                queryly.search.current_suggestion = results.metadata.suggestions[0];
            }

            //queryly.search.current_suggestion = results.metadata.suggest;

            document.getElementById('query_suggest').value = queryly.search.getFullSuggestion();

            if (document.getElementsByClassName("SearchResults-searchResultsFilterContainer").length > 0) {
                document.getElementsByClassName('SearchResults-searchResultsFilterContainer')[0].setAttribute("style", "display:none;");
            }

            try {

                if (typeof results.results == 'undefined' || results.results.length == 0) {
                    document.getElementById('searchcontainer').innerHTML = '<div style="margin: 50px;text-align: center;font-size: 30px;color: #444;">Unfortunately, there are no matching results of that type. Try searching a company or person for the best results.</div>';
                    document.getElementsByClassName('BuffettSearchResults-searchResultsFilterWrapper')[0].setAttribute("style", "display:none;");
                    return;
                }

                //loop through the search results.
                queryly.search.renderSearchContainer(results);
            }
            catch (e) { }

            document.getElementById('searchoutercontainer').style['display'] = 'block';
            //queryly.util.trackClick(document.getElementById('a.externallink'), queryly.util.getVisitorID());
            queryly.search.waitForReturn = false;

            if (queryly.search.totalpage == queryly.search.pagerequested && document.getElementById('nomoreresult') == null) {
                var elem = document.createElement("div");
                elem.innerHTML = '<div id="nomoreresult" style="padding:16px;font-weight:bold;text-align:center;"> - End of results - </div>';
                document.getElementById('searchcontainer').appendChild(elem);
            }

            var elem = document.getElementById('searchwaitmessage');
            if (elem != null) { elem.parentNode.removeChild(elem); }

            document.getElementById('popularcontainer').innerHTML = '';
        },

        renderPopular: function (results){
            var popularhtml = '';
            if (results.metadata.pagerequested == 1 && typeof results.popular != 'undefined' && results.popular.length > 0) {
                popularhtml = "<div class='Topic-container'><h1 class='Topic-header'>More On This Topic</h1>";
                for (var i = 0; i < results.popular.length; i++) {
                    if (results.popular[i].results.length == 0) {
                        continue;
                    }
                    if (results.popular[i].type == 'tags') {
                        popularhtml = popularhtml + '<div class="Topic-contentType"><h4 class="Topic-contentTitle">tags</h4><ul class="Topic-contentList">';
                        for (var j = 0; j < results.popular[i].results.length; j++) {
                            popularhtml = popularhtml + "<li class='Topic-contentListItem'><a href='" + results.popular[i].results[j].link + "'>" + results.popular[i].results[j].name + "</a></li>";
                        }
                        popularhtml = popularhtml + '</url></div>';
                    }
                    else if (results.popular[i].type == 'shows') {
                        popularhtml = popularhtml + '<div class="Topic-contentType"><h4 class="Topic-contentTitle">shows</h4><ul class="Topic-contentList">';
                        for (var j = 0; j < results.popular[i].results.length; j++) {
                            popularhtml = popularhtml + "<li class='Topic-contentListItem'><a href='" + results.popular[i].results[j].link + "'>" + results.popular[i].results[j].name + "</a></li>";
                        }
                        popularhtml = popularhtml + '</url></div>';
                    }
                    else if (results.popular[i].type == 'special_reports') {
                        popularhtml = popularhtml + '<div class="Topic-contentType"><h4 class="Topic-contentTitle">special reports</h4><ul class="Topic-contentList">';
                        for (var j = 0; j < results.popular[i].results.length; j++) {
                            popularhtml = popularhtml + "<li class='Topic-contentListItem'><a href='" + results.popular[i].results[j].link + "'>" + results.popular[i].results[j].name + "</a></li>";
                        }
                        popularhtml = popularhtml + '</url></div>';
                    }
                    else if (results.popular[i].type == 'person') {
                        popularhtml = popularhtml + '<div class="Topic-contentType"><h4 class="Topic-contentTitle">people</h4><ul class="Topic-contentList">';
                        for (var j = 0; j < results.popular[i].results.length; j++) {
                            popularhtml = popularhtml + "<li class='Topic-peopleListItem' style=\"background-color:#aaa;background-image:url('" + results.popular[i].results[j].image + "')\"><a href='" + results.popular[i].results[j].link + "'><span>" + results.popular[i].results[j].name + "</span></a></li>";
                        }
                        popularhtml = popularhtml + '</url></div>';
                    }
                }
            }
            return popularhtml;
        },

        renderSearchContainer : function(results){
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
                            if (queryly.resultdata["cn:promoImage"] != '') {
                                queryly.resultdata["cn:promoImage"] = queryly.resultdata["cn:promoImage"].replace('.1910x1000', '');
                            }
                            if (results.partners[0].results.length > 2) {
                                partner_html = partner_html + queryly.util.tmpl('queryly_template_crosspromotion', queryly.resultdata);
                            }
                            else {
                                partner_html = partner_html + queryly.util.tmpl('queryly_template_mockery', queryly.resultdata);
                            }

                        }
                        var elem = document.createElement("div");
                        if (results.partners[0].results.length > 2) {
                            elem.innerHTML = '<div style="margin-top:0px;" class="BuffettSearchResults-searchResultsBreaker"><div><div class="CrossPromotionBreaker-crossPromotionalBreaker"><div class="CrossPromotionBreaker-crossPromotionalBreakerWrapper"><div class="CrossPromotionBreaker-crossPromotionalBreakerTitle">From MOCKERY Make It</div><div class="CrossPromotionBreaker-crossPromotionalBreakerSliderTrack" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div class="CrossPromotionBreaker-crossPromotionalBreakerSlider" style="transform:translateX(0px)">' + partner_html + '</div></div><div class="CrossPromotionBreaker-crossPromotionalBreakerArrows"><button class="CrossPromotionBreaker-crossPromotionalBreakerArrowLeftInactive CrossPromotionBreaker-crossPromotionalBreakerArrowLeft CrossPromotionBreaker-crossPromotionalBreakerArrow icon-buffett-arrow-left-long"></button><button class="CrossPromotionBreaker-crossPromotionalBreakerArrowRight CrossPromotionBreaker-crossPromotionalBreakerArrow icon-buffett-arrow-right-long"></button></div></div></div></div></div>';
                        }
                        else {
                            elem.innerHTML = '<div style="border-top:4px solid #14548C;background:#f7f7f7;padding-top:30px;"><span style="padding: 6px;background: #14548C;color: white;font-size: 12px;margin-top: -58px;position: absolute;">From MOCKERY Make It</span>' + partner_html + '</div>';
                        }

                        document.getElementById('searchcontainer').appendChild(elem);
                    }
                }
                catch (e) { }


                queryly.resultdata = results.results[i];

                if (i == results.results.length - 1 || (typeof results.partners != 'undefined' && results.results[i]._index == 4 && results.partners.length > 0 && results.partners[0].results.length > 0)) {
                    queryly.resultdata.lastrow = true;
                }

                queryly.resultdata.label = '';
                if (queryly.resultdata["cn:promoImage"] != '') {
                    queryly.resultdata["cn:promoImage"] = queryly.resultdata["cn:promoImage"] + '&w=300';
                }

                queryly.resultdata['cn:title'] = queryly.resultdata['cn:title'].replace(/(([^\s]+\s\s*){15})(.*)/, "$1...");
                queryly.resultdata['cn:title'] = queryly.util.highlight(queryly.resultdata['cn:title'], results.metadata.stems);
                queryly.resultdata.description = queryly.resultdata.description.replace(/(([^\s]+\s\s*){25})(.*)/, "$1...")
                queryly.resultdata.description = queryly.util.highlight(queryly.resultdata.description, results.metadata.stems);

                try {
                    if (typeof queryly.resultdata.author != 'undefined' && queryly.resultdata.author != '' && typeof results.tags != 'undefined') {
                        for (var j = 0; j < results.tags.length; j++) {
                            if (results.tags[j].group == 'creator') {
                                for (var k = 0; k < results.tags[j].results.length; k++) {
                                    if (queryly.resultdata.author.toLowerCase() == results.tags[j].results[k].name.toLowerCase()) {
                                        queryly.resultdata.authorurl = results.tags[j].results[k].url;
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
                    if (typeof queryly.resultdata.section != 'undefined' && queryly.resultdata.section != '' && typeof results.tags != 'undefined') {
                        for (var j = 0; j < results.tags.length; j++) {
                            if (results.tags[j].group == 'section' || results.tags[j].group == 'franchise') {
                                for (var k = 0; k < results.tags[j].results.length; k++) {
                                    if (queryly.resultdata.section.toLowerCase() == results.tags[j].results[k].name.toLowerCase()) {
                                        queryly.resultdata.sectionurl = results.tags[j].results[k].url;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                catch (e) { }

                //load JavaScript Micro-Templating and generate HTML from JSON result.
                var html = queryly.util.tmpl('queryly_template_mockery', queryly.resultdata)
                var elem = document.createElement("div");
                elem.innerHTML = html;
                document.getElementById('searchcontainer').appendChild(elem);
            }
        },

        renderAdvancedResults: function (results) {
            queryly.search.total = results.metadata.totalresults;
            queryly.search.totalpage = results.metadata.totalpage;
            queryly.search.pagerequested = results.metadata.pagerequested;
            document.getElementById('searchcontainer').innerHTML = "";

            if (document.getElementsByClassName("SearchResults-searchResultsFilterContainer").length > 0) {
                document.getElementsByClassName('SearchResults-searchResultsFilterContainer')[0].setAttribute("style", "display:block;");
            }

            try {

                if (typeof results.results == 'undefined' || results.results.length == 0) {
                    document.getElementById('searchcontainer').innerHTML = '<div style="margin: 50px;text-align: center;font-size: 30px;color: #444;">Unfortunately, there are no matching results of that type. Try searching a company or person for the best results.</div>';
                    document.getElementsByClassName('BuffettSearchResults-searchResultsFilterWrapper')[0].setAttribute("style", "display:none;");
                    return;
                }

                if (document.getElementById('sortrelevancydate') != null) {
                    document.getElementById('sortrelevancydate').style['font-weight'] = 'bold';
                    document.getElementById('sortrelevancydate').style['color'] = '#732634';
                    document.getElementById('sortdate').style['font-weight'] = 'normal';
                    document.getElementById('sortdate').style['color'] = 'black';
                    if (queryly.search.sortby != '') {
                        if (queryly.search.sortby == 'date') {
                            document.getElementById('sortrelevancydate').style['font-weight'] = 'normal';
                            document.getElementById('sortrelevancydate').style['color'] = 'black';
                            document.getElementById('sortdate').style['font-weight'] = 'bold';
                            document.getElementById('sortdate').style['color'] = '#732634';
                        }
                    }
                }


                if (document.getElementById('formatfilter') == null) {
                    queryly.search.renderFormat(results);
                }



                //loop through the search results.
                queryly.search.renderSearchContainer(results);

                if (queryly.search.pagerequested == 1) {
                    var popularhtml = queryly.search.renderPopular(results);
                    document.getElementById('popularcontainer').innerHTML = popularhtml;
                }

            }
            catch (e) { }

            document.getElementById('searchoutercontainer').style['display'] = 'block';
            queryly.util.hookEvent(document.getElementsByClassName('queryly_result_link'), queryly.urlQuery);
            queryly.search.waitForReturn = false;

            var paginationhtml = queryly.search.renderPagination(results.metadata.pagerequested, results.metadata.totalresults, results.metadata.pagesize);
            if (paginationhtml != '') {
                var elem = document.createElement("div");
                elem.innerHTML = paginationhtml;
                document.getElementById('searchcontainer').appendChild(elem);
            }


            window.scrollTo(0, 0);
            if (document.getElementsByClassName('bars-loading').length > 0) {
                document.getElementsByClassName('bars-loading')[0].style['display'] = 'none';
            }
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

        getLastWord: function (o) {
            return ("" + o).replace(/[\s]+$/, '').split(/[\s]/).pop();
        },

        highlight: function (text, tokens) {
            var ht = text;
            try {

                for (var i = 0 ; i < tokens.length; i++) {
                    var regex = new RegExp(tokens[i], 'gi');
                    ht = ht.replace(regex, function (str) {
                        return "<span style='background-color: LightSkyBlue'>" + str + "</span>"
                    })
                }

            }
            catch (e) { }
            return ht;
        },

        getFullSuggestion: function () {
            var result = '';
            if (queryly.guess != '') {
                var q = queryly.searchbox.value;
                if (q.length > 0) {
                    var lastchar = q.charAt(q.length - 1);
                    var lastword = this.getLastWord(q);
                    var partialword = queryly.guess.substring(lastword.length);
                    if (lastchar != ' ' && queryly.guess.substring(0, lastword.length) == lastword.toLowerCase()) {
                        result = q + partialword;
                    }
                }
            }
            return result;
        },

        autoFillSuggestion: function () {
            var result = queryly.util.getFullSuggestion();
            if (result != '') {
                queryly.searchbox.value = (result);
            }
        },

        trackClick: function (url, q) {
            new Image().src = "//data.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&query=" + q + "&suggest=" + q + "&total=1&target=" + encodeURIComponent(url);
        },

        trackSearch: function (q) {
            new Image().src = "//data.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&query=" + q + "&suggest=" + q + "&total=1&target=";
        },

        hookEvent: function (links, isad, id) {
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener("mousedown", function () {
                    try {
                        queryly.util.trackClick(this.href.replace(/&amp;/g, "&"), queryly.urlQuery);
                    }
                    catch (e) { }
                });
            }
        }
    };

})(window);

function renderTickers(tickers) {
    var tkey = [];
    var tvalue = [];
    var tname = []
    for (var i = 0; i < tickers.length; i++) {
        if (typeof tickers[i].issuerId == 'undefined') {
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
        }
        catch (e) { }

        //var index = tkey.indexOf(tickers[i].issuerId);
        //tvalue[index].push(tickers[i].symbolName);
        //tname[index].push(tickers[i].companyName);
    }

    var quoteapi = 'https://quote.mockery.com/quote-html-webservice/quote.htm?&symbols=' + tname.join('|') + '&requestMethod=quick&noform=1&realtime=1&callback=renderTickerQuotes&output=jsonp';
    queryly.util.loadScript(quoteapi, function () {
    });

    //var elem = document.createElement("div");
    //var tickerhtml = '';
    //for (var i = 0; i < tkey.length; i++) {

    //    tickerhtml = tickerhtml + "<div style='margin-right:10px;margin-bottom:10px;background:#eee;font-size:20px;padding:5px;'>";
    //    for (var j = 0; j < tvalue[i].length; j++) {
    //        if (j == 0) {
    //            tickerhtml = tickerhtml + "<span>" + tname[i][j] + " : </span>";
    //        }
    //        tickerhtml = tickerhtml + "<span><a style='margin-right:10px;' href='https://www.mockery.com/quotes/?symbol=" + tvalue[i][j] + "'>" + tvalue[i][j] + "</a></span>";
    //    }
    //    tickerhtml = tickerhtml + "</div>";
    //}
    //elem.innerHTML = tickerhtml;
    //document.getElementById('tickercontainer').appendChild(elem)
}

function renderTickerQuotes(quotes) {
    try {
        if (typeof quotes.QuickQuoteResult.QuickQuote == 'undefined' || quotes.QuickQuoteResult.QuickQuote.length == 0) {
            document.getElementById('tickercontainer').style['display'] = 'none';
            if (document.getElementById('tickeroutercontainer') != null) {
                document.getElementById('tickeroutercontainer').style['display'] = 'none';
            }
            return;
        }
        var elem = document.createElement("div");
        var tickerhtml = '';
        for (var i = 0; i < quotes.QuickQuoteResult.QuickQuote.length; i++) {
            try {
                queryly.tickerdata = quotes.QuickQuoteResult.QuickQuote[i];
                queryly.tickerdata.change = queryly.tickerdata.change;
                queryly.tickerdata.changepercentage = parseFloat(queryly.tickerdata.change_pct).toFixed(1);
                tickerhtml = tickerhtml + queryly.util.tmpl('queryly_template_ticker', queryly.tickerdata);
            }
            catch (e) { }

        }

        if (document.getElementById('tickercontainer') == null) {
            var elem = document.createElement("div");
            elem.innerHTML = '<div id ="tickercontainer" style="padding: 10px;font-size: 24px;border-bottom: 1px solid #ccc; margin-bottom: 10px;width:30%;position:fixed;" />';
            document.getElementById('searchcontainer').appendChild(elem);
        }
        document.getElementById('tickercontainer').innerHTML = tickerhtml;
        document.getElementById('tickercontainer').style['display'] = 'block';
        if (document.getElementById('tickeroutercontainer') != null) {
            document.getElementById('tickeroutercontainer').style['display'] = 'block';
        }
    }
    catch (e) { }
}
