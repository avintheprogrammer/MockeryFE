/* eslint-disable */
//JS code for Queryly Instant and Advanced Search
var queryly = {};
(function (window) {
    queryly = {
        QuerylyKey: '152c5b6d27314088',
        urlQuery: '',
        instantSearch: false,
        searchtimer: null,
        searchredirect: '',
        searchapi: 'https://api.queryly.com', //'http://devapi.queryly.com',
        redirecturl: '/warren-buffett-search-results/',
        activesearchbox: null,

        initialize: function (config) {
            queryly.initalize(config);
        },

        initalize: function (config) {

            if (typeof config != 'undefined' && typeof config.service != 'undefined') {
                if (typeof config.service.searchapi != 'undefined') {
                    queryly.searchapi = config.service.searchapi;
                }
                if (typeof config.service.querylykey != 'undefined') {
                    queryly.QuerylyKey = config.service.querylykey;
                }
            }

            try {
                if (document.getElementById('query') != null) {
                    document.getElementById('query').style['autocorrect'] = 'off';
                    document.getElementById('query').style['autocapitalize'] = 'off';
                    document.getElementById('query').style['autocomplete'] = 'off';
                    document.getElementById('query').style['border-bottom'] = '1px solid #ccc';
                    document.getElementById('query').setAttribute("placeholder", "Search");
                    if (document.getElementById('query_inheader') != null) {
                        document.getElementById('query_inheader').style['autocorrect'] = 'off';
                        document.getElementById('query_inheader').style['autocapitalize'] = 'off';
                        document.getElementById('query_inheader').style['autocomplete'] = 'off';
                        document.getElementById('query_inheader').style['border-bottom'] = '1px solid #ccc';
                        document.getElementById('query_inheader').setAttribute("placeholder", "Search");
                    }
                }

                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0].toLowerCase() == 'query' && queryly.activesearchbox == null) {
                        queryly.activesearchbox = document.getElementById('query');
                        queryly.urlQuery = decodeURIComponent(sParameterName[1].trim()) + ' '
                        document.getElementById('query').value = queryly.urlQuery.trim();
                        queryly.search.doAdvancedSearch(1);
                        queryly.util.trackSearch(queryly.urlQuery);
                        break;
                    }
                }


            }
            catch (e) { }



            Array.prototype.forEach.call(document.getElementsByClassName('query'), function (elem) {
                elem.addEventListener("keyup", function (event) {
                    switch (event.keyCode) {
                        case 37: return;
                        case 38: return;
                        case 39: return;
                        case 40: return;
                    }
                    queryly.activesearchbox = this;
                    clearTimeout(queryly.searchtimer);
                    queryly.search.waitForReturn = false;
                    //generate the full query string based on keyword predication.
                    var full_suggest = queryly.search.getFullSuggestion(this);
                    var current_query = this.value;

                    if (current_query == '') {
                        queryly.search.resetsearch();
                    }
                    else if ((full_suggest == '') || (full_suggest.indexOf(current_query.toLowerCase()) != 0)) {
                        //put some pause so that it doesn't fire too freqently.
                        queryly.instantSearch = true;
                        queryly.searchtimer = setTimeout("queryly.search.doInstantSearch();", 500);
                        //document.getElementById('closebtn').style['z-index'] = '99999';
                    }

                });
            });

            Array.prototype.forEach.call(document.getElementsByClassName('query'), function (elem) {
                elem.addEventListener("keydown", function (event) {
                    queryly.activesearchbox = this;
                    var keyCode = event.keyCode || event.which;
                    if (keyCode == 9) {
                        event.preventDefault();
                        var result = queryly.search.getFullSuggestion(this);
                        if (result != '') {
                            this.value = result;
                        }
                    }
                    else if (keyCode == 32) {
                        queryly.search.current_suggestion = "";
                    }
                    else if (keyCode == 13) {
                        if (this.value != '') {
                            var fullsuggest = queryly.search.getFullSuggestion(this).trim();
                            if (fullsuggest == '') {
                                fullsuggest = this.value.trim();
                            }
                            window.location = queryly.redirecturl + "?query=" + encodeURIComponent(fullsuggest);
                        }

                    }
                });
            });


            Array.prototype.forEach.call(document.getElementsByClassName('query'), function (elem) {
                elem.addEventListener("input propertychange", function () {
                    queryly.activesearchbox = this;
                    clearTimeout(queryly.searchtimer);
                    queryly.search.waitForReturn = false;

                    if (this.value == '') {
                        queryly.search.resetsearch();
                        return;
                    }
                    else {
                        queryly.timer = setTimeout("queryly.search.doInstantSearch();", 500);
                    }
                });
            });


            Array.prototype.forEach.call(document.getElementsByClassName('query'), function (elem) {
                elem.addEventListener("click", function (event) {
                    queryly.activesearchbox = this;
                    var result = queryly.search.getFullSuggestion(this);
                    if (result != '') {
                        this.value = result;
                    }
                });
            });

            Array.prototype.forEach.call(document.getElementsByClassName('Search-submitBtn'), function (elem) {
                elem.addEventListener("click", function (event) {
                    if (queryly.activesearchbox == null) {
                        return;
                    }
                    var fullsuggest = queryly.search.getFullSuggestion(queryly.activesearchbox).trim();
                    if (fullsuggest == '') {
                        fullsuggest = queryly.activesearchbox.value.trim();
                    }
                    if (fullsuggest != '') {
                        window.location = queryly.redirecturl + "?query=" + encodeURIComponent(fullsuggest);
                    }

                });
            });

            if (queryly.urlQuery.trim() == '' && document.getElementsByClassName('BuffettSearchResults-searchResultsFilterWrapper').length > 0) {
                document.getElementsByClassName('BuffettSearchResults-searchResultsFilterWrapper')[0].setAttribute("style", "display:none;");
            }

        }
    };

    queryly.search = {
        current_suggestion: '',
        curent_query: '',
        endIndex: 0,
        batchSize: 10,
        waitForReturn: false,
        sortby: '',
        facetedkey: [],
        facetedvalue: [],

        resetsearch: function () {
            queryly.search.current_suggestion = '';
            queryly.search.curent_query = '';
            queryly.search.endIndex = 0;
            document.getElementById('query').value = '';
            document.getElementById('query_suggest').value = '';
            if (document.getElementById('searchsuggestions') != null) {
                document.getElementById('searchsuggestions').innerHTML = '';
                document.getElementById('searchsuggestions').style['display'] = 'none';
            }
            try {
                if (document.getElementById('query_inheader') != null) {
                    document.getElementById('query_inheader').value = '';
                    document.getElementById('query_suggest_inheader').value = '';
                    if (document.getElementById('searchsuggestions_inheader') != null) {
                        document.getElementById('searchsuggestions_inheader').innerHTML = '';
                        document.getElementById('searchsuggestions_inheader').style['display'] = 'none';
                    }
                }
            }
            catch (e) { }
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
                if (option.value == 'Special Reports') {
                    document.getElementById('formatfilter').style.width = '240px';
                    document.getElementById('formatfilter').style.minWidth = '240px';
                }
                else if (option.value == 'Video') {
                    document.getElementById('formatfilter').style.width = '110px';
                    document.getElementById('formatfilter').style.minWidth = '110px';
                }
                else if (option.value == 'Slideshow') {
                    document.getElementById('formatfilter').style.width = '160px';
                    document.getElementById('formatfilter').style.minWidth = '160px';
                }
                else {
                    document.getElementById('formatfilter').style.width = '140px';
                    document.getElementById('formatfilter').style.minWidth = '140px';
                }
            }
            else {
                document.getElementById('formatfilter').style.width = '180px';
                document.getElementById('formatfilter').style.minWidth = '180px';
            }
            queryly.search.doAdvancedSearch(1);
            return false;
        },

        resetkeyword: function () {
            document.getElementById('keyword').value = '';
        },

        //main method for calling search api. isNew == true means a brand new search, otherwise, it is a pulling additional results for an existing search
        doInstantSearch: function () {
            //document.getElementById('closebtn').style['z-index'] = '99999';

            var query = queryly.activesearchbox.value;
            //assemble the rest api.
            var url = queryly.searchapi + "/mockery/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + query + "&endindex=0&batchsize=0&callback=&showfaceted=false";

            //making the search call to Queryly server
            //document.getElementById('articlecontainer').style['display'] = 'none';
            try {
                if (queryly.activesearchbox.id == "query") {
                    document.getElementById('instantsearchcontainer').style['display'] = 'block';
                    if (document.getElementById('instantsearchcontainer_inheader') != null) {
                        document.getElementById('instantsearchcontainer_inheader').style['display'] = 'none';
                    }
                }
                else {
                    document.getElementById('instantsearchcontainer').style['display'] = 'none';
                    if (document.getElementById('instantsearchcontainer_inheader') != null) {
                        document.getElementById('instantsearchcontainer_inheader').style['display'] = 'block';
                    }
                }
            }
            catch (e) { }


            queryly.util.callAjax(url, queryly.search.renderResults);
        },

        doAdvancedSearch: function (pagerequested) {
            queryly.instantSearch = false;
            if (queryly.urlQuery.trim() == '') {
                return;
            }
            var url = queryly.searchapi + "/mockery/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + queryly.urlQuery.trim() + ' ' + "&endindex=" + Math.max(0, pagerequested - 1) * queryly.search.batchSize + "&batchsize=" + queryly.search.batchSize + "&callback=&showfaceted=true&timezoneoffset=300&partners=31a35d40a9a64ab3,mockery,5";
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
            document.getElementById('searchcontainer').style['display'] = 'block';
            //document.getElementById('searchcontainer').innerHTML = "<div><img style='width:100%' src='//www.queryly.com/images/loading.gif'/></div>";
            if (document.getElementsByClassName('bars-loading').length > 0) {
                document.getElementsByClassName('bars-loading')[0].style['display'] = 'block';
            }

            queryly.util.callAjax(url, queryly.search.renderResults);
        },

        //generate a auto-completed keyword based on the search suggestion
        getFullSuggestion: function (searchbox) {
            var result = '';
            if (searchbox != null && queryly.search.current_suggestion != '') {
                var q = searchbox.value;
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
            var html = '<style> @media screen and (min-width: 0px) and (max-width: 760px) { .css-on-mobile { width: 100%!important; } }</style><select style="font-weight:bold;outline:none;font-size:16px;width:180px;min-width:180px" onchange="queryly.search.switchformat(this);" id="formatfilter" class="css-on-mobile minimal BuffettSearchResults-searchResultsSelect"><option value="">All Formats</option>';
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
            if (document.getElementsByClassName('BuffettSearchResults-searchResultsSelectWrapper') != null) {
                document.getElementsByClassName('BuffettSearchResults-searchResultsSelectWrapper')[0].appendChild(elem);
            }
        },

        renderPagination: function (pagerequested, total, batchsize) {
            var html = "";
            if (batchsize < total) {
                html = "<div class='Pagination-pagination BuffettSearchResults-searchResultsWrapper'>";
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

        //convert JSON response into HTML and add it on the page.
        renderResults: function (results) {
            queryly.search.current_suggestion = '';
            if (typeof results.metadata.suggestions != 'undefined' && results.metadata.suggestions.length > 0) {
                queryly.search.current_suggestion = results.metadata.suggestions[0];
            }
            //queryly.search.total = results.metadata.total;
            queryly.search.endIndex = results.metadata.pagerequested * results.metadata.pagesize;
            if (queryly.activesearchbox.id == "query") {
                document.getElementById('query_suggest').value = queryly.search.getFullSuggestion(document.getElementById('query'));
            }
            else {
                document.getElementById('query_suggest_inheader').value = queryly.search.getFullSuggestion(document.getElementById('query_inheader'));
            }

            if (queryly.instantSearch) {

                //display topic, ticker or other type of results at the beginning of the results.
                if (queryly.activesearchbox.id == "query") {
                    if (document.getElementById('searchsuggestions') == null) {
                        var elem = document.createElement("div");
                        elem.innerHTML = "<div id='searchsuggestions'  style='position: absolute;background: #FCFBF8;top: 59px;width: calc(100% - 0px);z-index: 1;border: 1px solid #444;'/>";
                        document.getElementById('instantsearchcontainer').appendChild(elem);
                    }
                    else {
                        document.getElementById('searchsuggestions').innerHTML = '';
                    }
                }
                else {
                    if (document.getElementById('searchsuggestions_inheader') == null) {
                        var elem = document.createElement("div");
                        elem.innerHTML = "<div id='searchsuggestions_inheader'  style='position: absolute;background: #FCFBF8;top: 59px;width: calc(100% - 0px);z-index: 1;border: 1px solid #444;'/>";
                        document.getElementById('instantsearchcontainer_inheader').appendChild(elem);
                    }
                    else {
                        document.getElementById('searchsuggestions_inheader').innerHTML = '';
                    }
                }



                if (typeof results.metadata.facetsuggestions != 'undefined') {
                    for (var i = 0; i < results.metadata.facetsuggestions.length; i++) {
                        if (results.metadata.facetsuggestions[i].length == 0) {
                            continue;
                        }
                        var elem = document.createElement("div");
                        elem.innerHTML = "<div style='padding: 10px;font-size: 24px;border-bottom: 1px solid #ccc; margin-bottom: 10px; font-weight: bold;'><div style='float:right;font-weight: normal;font-size: 20px;'>" + results.metadata.facetsuggestions[i].facet.replace("stock", "company") + "</div><a style='text-decoration:none;color:#732634;' href='" + queryly.redirecturl + "?query=" + encodeURIComponent(results.metadata.facetsuggestions[i].suggestions[0]) + "'>" + results.metadata.facetsuggestions[i].suggestions[0] + "</a></div >";
                        if (queryly.activesearchbox.id == "query") {
                            document.getElementById('searchsuggestions').appendChild(elem);
                        }
                        else {
                            document.getElementById('searchsuggestions_inheader').appendChild(elem);
                        }

                    }
                }
                var elem = document.createElement("div");
                var fullsuggest = queryly.search.getFullSuggestion(queryly.activesearchbox).trim();
                if (fullsuggest == '') {
                    fullsuggest = queryly.activesearchbox.value.trim();
                }
                elem.innerHTML = "<div style='padding: 10px;font-size: 14px; margin-bottom: 10px; font-weight: normal;text-transform:uppercase;'><a  style='text-decoration:none;color:#732634;' href='" + queryly.redirecturl + "?query=" + fullsuggest + "'>View all Search Results For \"" + fullsuggest + "\"</a></div >";
                if (queryly.activesearchbox.id == "query") {
                    document.getElementById('searchsuggestions').appendChild(elem);
                    document.getElementById('searchsuggestions').style['display'] = 'block';
                }
                else {
                    document.getElementById('searchsuggestions_inheader').appendChild(elem);
                    document.getElementById('searchsuggestions_inheader').style['display'] = 'block';
                }


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

            //document.getElementById('searchresultscount').innerHTML = results.metadata.totalresults + " SEARCH RESULTS FOR <span style='text-decoration:uppercase;font-weight:bold;'>\"" + queryly.urlQuery.trim() + "</span>\"";
            if (document.getElementsByClassName('BuffettSearchResults-searchResultsAmount') != null && document.getElementsByClassName('BuffettSearchResults-searchResultsAmount').length > 0) {
                for (var i = 0; i < document.getElementsByClassName('BuffettSearchResults-searchResultsAmount').length; i++) {
                    document.getElementsByClassName('BuffettSearchResults-searchResultsAmount')[i].innerHTML = "<style> @media screen and (min-width: 0px) and (max-width: 500px) { .hide-on-mobile { display: none!important; } }</style>" + results.metadata.totalresults + " SEARCH RESULTS " + "<div style='display:inline-block;' class='hide-on-mobile'>FOR \"<span style='text-decoration:uppercase;font-weight:bold;'>" + queryly.urlQuery.trim() + "</span>\"</div>";
                }
            }

            //document.getElementById("searchcontainerheader").style["display"] = "block";
            document.getElementById('searchcontainer').innerHTML = '';

            try {

                if (typeof results.results == 'undefined' || results.results.length == 0) {
                    document.getElementById('searchcontainer').innerHTML = '<div style="margin: 50px;text-align: center;font-size: 30px;color: #444;">No results is found. Please search a different keyword.</div>';
                    document.getElementsByClassName('BuffettSearchResults-searchResultsFilterWrapper')[0].setAttribute("style", "display:none;");
                    return;
                }

                //loop through the search results.

                for (var i = 0; i < results.results.length; i++) {
                    //add partner results at a spcific positioin if available.
                    try {
                        if (typeof results.partners != 'undefined' && results.results[i]._index == 5 && results.partners.length > 0 && results.partners[0].results.length > 2) {
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

                                queryly.resultdata['cn:title'] = queryly.resultdata['cn:title'].replace(/(([^\s]+\s\s*){15})(.*)/, "$1...");
                                queryly.resultdata['cn:title'] = queryly.util.highlight(queryly.resultdata['cn:title'], results.metadata.stems);
                                queryly.resultdata.description = queryly.resultdata.description.replace(/(([^\s]+\s\s*){25})(.*)/, "$1...")
                                queryly.resultdata.description = queryly.util.highlight(queryly.resultdata.description, results.metadata.stems);

                                try {
                                    queryly.resultdata['_pubDate'] = queryly.util.getDateString(new Date(queryly.resultdata._pubDate));
                                }
                                catch (e) { }


                                if (queryly.resultdata["cn:promoImage"] != '') {
                                    queryly.resultdata["cn:promoImage"] = queryly.resultdata["cn:promoImage"] + '&w=300';
                                }
                                else {
                                    queryly.resultdata["cn:promoImage"] = '//www.queryly.com/images/breaker-placeholder.jpg';
                                }
                                queryly.resultdata.label = "";

                                if (results.partners[0].results.length > 2) {
                                    partner_html = partner_html + queryly.util.tmpl('queryly_template_crosspromotion', queryly.resultdata);
                                }
                                else {
                                    partner_html = partner_html + queryly.util.tmpl('queryly_template_buffett', queryly.resultdata);
                                }
                            }
                            var elem = document.createElement("div");

                            if (results.partners[0].results.length > 2) {
                                elem.innerHTML = '<style> .cardFooterFont { font-size: 12px; } </style><style> @media screen and (min-width: 0px) and (max-width: 500px) { .cardFooterFont { font-size: 10px; } }</style><div style="margin-top:0px;" class="BuffettSearchResults-searchResultsBreaker"><div class="BuffettSearchResults-searchResultsWrapper"><div class="BuffettSearchResults-searchResultsBox"><div style="border-color: #732634;" class="CrossPromotionBreaker-crossPromotionalBreaker"><div class="CrossPromotionBreaker-crossPromotionalBreakerWrapper"><div class="CrossPromotionBreaker-crossPromotionalBreakerTitle">From MOCKERY</div><div class="CrossPromotionBreaker-crossPromotionalBreakerSliderTrack" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"><div class="CrossPromotionBreaker-crossPromotionalBreakerSlider" style="transform:translateX(0px)">' + partner_html + '</div></div><div class="CrossPromotionBreaker-crossPromotionalBreakerArrows"><button onclick="queryly.search.partnerMoveRight(-1);"  class="CrossPromotionBreaker-crossPromotionalBreakerArrowLeft CrossPromotionBreaker-crossPromotionalBreakerArrowLeft CrossPromotionBreaker-crossPromotionalBreakerArrow icon-buffett-arrow-left-long"></button><button onclick="queryly.search.partnerMoveRight(1);" class="CrossPromotionBreaker-crossPromotionalBreakerArrowRight CrossPromotionBreaker-crossPromotionalBreakerArrow icon-buffett-arrow-right-long"></button></div></div></div></div></div></div>';
                            }
                            else {
                                elem.innerHTML = '<div style="border-top:4px solid #14548C;background:#f7f7f7;padding-top:30px;"><span style="padding: 4px;background: #14548C;color: white;font-size: 12px;margin-top: -56px;position: absolute;padding-right: 10px;padding-left: 10px;">From MOCKERY</span>' + partner_html + '</div>';
                            }

                            document.getElementById('searchcontainer').appendChild(elem);
                        }
                    }
                    catch (e) { }


                    queryly.resultdata = results.results[i];




                    queryly.resultdata.label = '';

                    if (typeof queryly.resultdata["cn:videoTranscript"] != 'undefined' && typeof queryly.resultdata["cn:videoTranscript"]["cn:chapter"] != 'undefined' && queryly.resultdata["cn:videoTranscript"]["cn:chapter"].length > 0) {
                        if (typeof queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0]["cn:transcript"] != 'undefined') {
                            queryly.resultdata.videofooter = queryly.resultdata["cn:videoTranscript"]["videotitle"] + " | chapter " + queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].chapter + " - " + queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].title;
                            queryly.resultdata['cn:title'] = queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0]["cn:transcript"][0].title;
                            queryly.resultdata.description = '';
                            if (typeof queryly.resultdata["cn:videoTranscript"]["videoimage"] != "undefined") {
                                queryly.resultdata["cn:promoImage"] = queryly.resultdata["cn:videoTranscript"]["videoimage"];
                            }
                            if (typeof queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0]["cn:transcript"][0].in != 'undefined') {
                                queryly.resultdata.videopoints = "start=" + queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0]["cn:transcript"][0].in;
                            }
                            queryly.resultdata.label = 'Excerpt';
                            queryly.resultdata['cn:liveURL'] = queryly.resultdata["cn:videoTranscript"]["videourl"] + "?&" + queryly.resultdata.videopoints;
                        }
                        else {
                            queryly.resultdata.videofooter = queryly.resultdata["cn:videoTranscript"]["videotitle"];
                            if (typeof queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].chapter == 'undefined') {
                                continue;
                            }
                            queryly.resultdata['cn:title'] = "Chapter " + queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].chapter + ". " + queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].title;
                            if (typeof queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].in != 'undefined') {
                                queryly.resultdata.videopoints = "start=" + queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].in;
                                if (typeof queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].out != 'undefined') {
                                    queryly.resultdata.videopoints = queryly.resultdata.videopoints + "&end=" + queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].out;
                                    queryly.resultdata.duration = queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].out - queryly.resultdata["cn:videoTranscript"]["cn:chapter"][0].in;
                                }
                            }
                            queryly.resultdata.label = 'Chapter';
                            queryly.resultdata['cn:liveURL'] = queryly.resultdata["cn:videoTranscript"]["videourl"] + "?&" + queryly.resultdata.videopoints;
                            if (typeof queryly.resultdata["cn:videoTranscript"]["videoimage"] != "undefined") {
                                queryly.resultdata["cn:promoImage"] = queryly.resultdata["cn:videoTranscript"]["videoimage"];
                            }

                        }

                        if (typeof queryly.resultdata.videopoints != 'undefined') {
                            queryly.resultdata['cn:liveURL'] = queryly.resultdata["cn:videoTranscript"]["videourl"] + "?&" + queryly.resultdata.videopoints;
                        }
                    }

                    if (i == results.results.length - 1 || (typeof results.partners != 'undefined' && results.results[i]._index == 4 && results.partners.length > 0 && results.partners[0].results.length > 0)) {
                        queryly.resultdata.lastrow = true;
                    }


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


                    if (typeof queryly.resultdata["cn:subtype"] != 'undefined' && queryly.resultdata["cn:subtype"].indexOf("full_length") >= 0) {
                        queryly.resultdata.label = 'Full Length';
                    }
                    else if (typeof queryly.resultdata["cn:subtype"] != 'undefined' && queryly.resultdata["cn:subtype"].indexOf("clip") >= 0) {
                        queryly.resultdata.label = 'Clip';
                    }
                    else if (queryly.resultdata["cn:type"] == "partnerstory" || queryly.resultdata["cn:type"] == "blogpost" || queryly.resultdata["cn:type"] == "mockerynewsstory" || queryly.resultdata["cn:type"] == "pressrelease") {
                        queryly.resultdata.label = 'Article';
                    }
                    else if (queryly.resultdata["cn:type"] == "slideshow") {
                        queryly.resultdata.label = 'Slideshow';
                    }
                    else if (queryly.resultdata["cn:type"] == "mockeryvideo") {
                        queryly.resultdata.label = 'Full Length';
                    }



                    queryly.resultdata['cn:title'] = queryly.resultdata['cn:title'].replace(/(([^\s]+\s\s*){18})(.*)/, "$1...");
                    queryly.resultdata['cn:title'] = queryly.util.highlight(queryly.resultdata['cn:title'], results.metadata.stems);
                    queryly.resultdata.description = queryly.resultdata.description.replace(/(([^\s]+\s\s*){25})(.*)/, "$1...")
                    queryly.resultdata.description = queryly.util.highlight(queryly.resultdata.description, results.metadata.stems);
                    if (queryly.resultdata["cn:promoImage"] != '') {
                        queryly.resultdata["cn:promoImage"] = queryly.resultdata["cn:promoImage"] + '&w=300';
                    }

                    try {
                        queryly.resultdata['_pubDate'] = queryly.util.getDateString(new Date(queryly.resultdata._pubDate));
                    }
                    catch (e) { }

                    //load JavaScript Micro-Templating and generate HTML from JSON result.
                    var html = queryly.util.tmpl('queryly_template_buffett', queryly.resultdata)
                    var elem = document.createElement("div");
                    elem.innerHTML = html;
                    document.getElementById('searchcontainer').appendChild(elem);
                }
            }
            catch (e) { }

            document.getElementById('searchcontainer').style['display'] = 'block';
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
        },
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
                        return "<span style='background-color: #E2D7D4;'>" + str + "</span>"
                    })
                }

            }
            catch (e) { }
            return ht;
        },

        getDateString: function (date) {
            var localtime = new Date(date.getTime() - new Date().getTimezoneOffset() * 60000);
            var datestring = '';
            try {
                var diff = Math.floor((Date.now() - localtime) / (1000 * 60))
                if (diff < 5) {
                    datestring = 'Updated moments ago';
                }
                else if (diff < 60) {
                    datestring = 'Updated ' + diff + ' mins ago';
                }
                else if (diff < 1440) {
                    datestring = 'Updated ' + Math.ceil(diff / 60) + ' hrs ago'
                }
                else {
                    datestring = localtime.toLocaleDateString().replace(/\//g, '-') + ' • ' + localtime.toLocaleTimeString();
                    //datestring = datestring.substring(0, 3) + ", " + datestring.substring(4);
                }
            }
            catch (e) { }
            return datestring;
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
