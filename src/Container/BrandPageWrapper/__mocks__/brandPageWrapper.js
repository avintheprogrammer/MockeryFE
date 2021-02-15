const mock = {
  header: {
    collapsed: [
      {
        name: 'markets',
        label: 'MARKETS',
        path: '/markets/',
        host: 'www.mockery.com',
        attr: {
          data: {
            trknavattr: 'navigation:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'business_news',
        label: 'BUSINESS NEWS',
        path: '/us-news/',
        host: 'www.mockery.com',
        attr: {
          data: {
            trknavattr: 'navigation:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'investing',
        label: 'INVESTING',
        path: '/investing/',
        host: 'www.mockery.com',
        attr: {
          data: {
            trknavattr: 'navigation:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'tech',
        label: 'TECH',
        path: '/technology/',
        host: 'www.mockery.com',
        attr: {
          data: {
            trknavattr: 'navigation:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'politics',
        label: 'POLITICS',
        path: '/politics/',
        host: 'www.mockery.com',
        attr: {
          data: {
            trknavattr: 'navigation:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'live_tv',
        label: 'MOCKERY TV',
        path: '/live-tv/',
        host: 'www.mockery.com',
        attr: {
          data: {
            trknavattr: 'navigation:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
    ],
    expanded: [
      {
        name: 'markets',
        label: 'MARKETS',
        path: '/markets/',
        host: 'www.mockery.com',
        items: [
          {
            name: 'pre_markets',
            label: 'Pre-Markets',
            path: '/pre-markets/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'us_markets',
            label: 'U.S. Markets',
            path: '/us-markets/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'asia_markets',
            label: 'Asia Markets',
            path: '/markets-asia-pacific/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'europe_markets',
            label: 'Europe Markets',
            path: '/markets-europe/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'stock_markets',
            label: 'Stock',
            path: '/stocks/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'commodities_markets',
            label: 'Commodities',
            path: '/commodities/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'currencies_markets',
            label: 'Currencies',
            path: '/currencies/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'bonds_markets',
            label: 'Bonds',
            path: '/bonds/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'funds_markets',
            label: 'Funds',
            path: '/mutual-funds/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'etf_markets',
            label: 'ETFs',
            path: '/exchange-traded-funds/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
        ],
        attr: {
          data: {
            trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
          },
        },
      },
      {
        name: 'business_news',
        label: 'BUSINESS NEWS',
        path: '/us-news/',
        host: 'www.mockery.com',
        items: [
          {
            name: 'economy_news',
            label: 'Economy',
            path: '/economy/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'finance_news',
            label: 'Finance',
            path: '/finance/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'healthcare_news',
            label: 'Health Care',
            path: '/health-care/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'real_estate_news',
            label: 'Real Estate',
            path: '/real-estate/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'energy_news',
            label: 'Energy',
            path: '/energy/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'transportation_news',
            label: 'Transportation',
            path: '/transportation/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'retail_news',
            label: 'Retail',
            path: '/retail/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'media_news',
            label: 'Media',
            path: '/media/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'wealth_news',
            label: 'Wealth',
            path: '/wealth/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
        ],
        attr: {
          data: {
            trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
          },
        },
      },
      {
        name: 'investing',
        label: 'INVESTING',
        path: '/investing/',
        host: 'www.mockery.com',
        items: [
          {
            name: 'personal_finance_investing',
            label: 'Personal Finance',
            path: '/personal-finance/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'financial_advisors_investing',
            label: 'Financial Advisors',
            path: '/financial-advisors/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'trading_nation_investing',
            label: 'Trading Nation',
            path: '/trading-nation/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'etf_street',
            label: 'ETF Street',
            path: '/etf-street/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'buffett_watch_investing',
            label: 'Buffett Watch',
            path: '/buffett-watch/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
              },
            },
            items: [],
          },
        ],
        attr: {
          data: {
            trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
          },
        },
      },
      {
        name: 'tech',
        label: 'TECH',
        path: '/technology/',
        host: 'www.mockery.com',
        items: [
          {
            name: 'mobile_tech',
            label: 'Mobile',
            path: '/mobile/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'social_media_tech',
            label: 'Social Media',
            path: '/social-media/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'enterprise_tech',
            label: 'Enterprise',
            path: '/enterprise/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'cybersecurity_tech',
            label: 'Cybersecurity',
            path: '/cybersecurity/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'innovation',
            label: 'Innovation',
            path: '/innovation/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
        ],
        attr: {
          data: {
            trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
          },
        },
      },
      {
        name: 'politics',
        label: 'POLITICS',
        path: '/politics/',
        host: 'www.mockery.com',
        items: [
          {
            name: 'white_house_politics',
            label: 'White House',
            path: '/white-house/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'policy_politics',
            label: 'Policy',
            path: '/policy/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'congress_politics',
            label: 'Congress',
            path: '/congress/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'world_politics',
            label: 'World Politics',
            path: '/world-politics/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'law_politics',
            label: 'Law',
            path: '/law/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'taxes_politics',
            label: 'Taxes',
            path: '/taxes/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
        ],
        attr: {
          data: {
            trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
          },
        },
      },
      {
        name: 'live_tv',
        label: 'MOCKERY TV',
        path: '/live-tv/',
        host: 'www.mockery.com',
        items: [
          {
            name: 'live_tv',
            label: 'MOCKERY TV',
            path: '/live-tv/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'top_video',
            label: 'Top Video',
            path: '/top-video/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'bussiness_day_shows',
            label: 'Business Day Shows',
            path: '/tv-worldwide/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'primetime_shows',
            label: 'Primetime Shows',
            path: '/make-it/shows/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
          {
            name: 'full_episodes',
            label: 'Full Episodes',
            path: '/live-tv/',
            host: 'www.mockery.com',
            attr: {
              data: {
                trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
              },
            },
            items: [],
          },
        ],
        attr: {
          data: {
            trknavattr: 'navigation:${parent}:${label}:${currentDocNID}',
          },
        },
      },
      {
        name: 'dynamic',
        source: {
          name: 'CAPI',
          path: '/list/id/',
          id: '104315562',
        },
        attr: {
          parent: {
            data: {
              trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
            },
          },
          child: {
            data: {
              trknavattr: 'navigation:${parent}:${self}:${currentDocNID}',
            },
          },
        },
        items: [],
      },
    ],
    featured: [
      {
        name: 'user_signin',
        label: 'SIGN IN',
        path: 'javascript:void(0);',
        host: '',
        attr: {
          data: {
            trknavattr: 'featured:${parent}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'pro_subscriber',
        label: 'PRO',
        path: '/pro/',
        host: 'www.mockery.com',
        attr: {
          data: {
            trknavattr: 'featured:${parent}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'watchlist',
        label: 'WATCHLIST',
        path: '/',
        host: 'watchlist.mockery.com',
        attr: {
          data: {
            trknavattr: 'featured:${parent}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'makeit',
        label: 'MAKE IT',
        path: '/makeit/',
        host: 'www.mockery.com',
        attr: {
          data: {
            trknavattr: 'featured:${parent}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
    ],
    edition: [
      {
        name: 'us_edition',
        label: 'USA',
        path: 'javascript:void(0);',
        host: '',
        attr: {
          data: {
            trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'international_edition',
        label: 'INTL',
        path: 'javascript:void(0);',
        host: '',
        attr: {
          data: {
            trknavattr: 'navigation:${parent}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
    ],
  },
  footer: {
    main: [
      {
        name: 'about_mockery',
        label: 'About MOCKERY',
        path: '/about/',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'help',
        label: 'Help',
        path: '/',
        host: 'https://mockeryllca.custhelp.com',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'contact',
        label: 'Contact',
        path: '/app/ask',
        host: 'https://mockeryllca.custhelp.com',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'contact',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'careers',
        label: 'Careers',
        path: '/mockery-careers-and-employment/',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'advertise',
        label: 'Advertise With Us',
        path: '/advertising-and-partnerships/',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'licensing_and_reprints',
        label: 'Licensing &amp; Reprints',
        path: '/mockery-reprints/',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'corrections',
        label: 'Corrections',
        path: '/corrections/',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'independent_programming',
        label: 'Independent Programming',
        path: '/news-information/nbcuniversal-transaction/independent-programming',
        host: 'https://corporate.comcast.com',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'closed_captioning',
        label: 'Closed Captioning',
        path: '/closed-captioning/',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'privacy_policy',
        label: 'Privacy Policy',
        path: '/privacy/',
        host: 'https://www.nbcuni.com',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'terms_of_service',
        label: 'Terms of Service',
        path: '/nbcuniversal-terms-of-service/',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'news_tips_link',
        label: 'Get In Touch',
        path: '/news-tips/',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'newsletter_link',
        label: 'Sign Up Now',
        path: '/sign-up-for-mockery-newsletters/',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'subscribe_with_icon',
        label: 'Subscribe to',
        path: '/application/pro/?__source=pro|display|mockery|house|PRO_Footer_MktgPg',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
    ],
    social: [
      {
        name: 'facebook',
        label: '',
        path: '/mockery/',
        host: 'https://www.facebook.com',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'twitter',
        label: '',
        path: '/mockery/',
        host: 'https://www.twitter.com',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'linkedin',
        label: '',
        path: '/mockery/',
        host: 'https://www.linkedin.com/company',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'instagram',
        label: '',
        path: '/mockery/',
        host: 'https://www.instagram.com',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'youtube',
        label: '',
        path: '/mockery/',
        host: 'https://www.youtube.com',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
      {
        name: 'rss',
        label: '',
        path: '/id/28295763',
        host: '',
        attr: {
          data: {
            trknavattr: 'footer:${name}:${name}:${currentDocNID}',
          },
        },
        items: [],
      },
    ],
  },
};

export default mock;
