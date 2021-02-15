// import wireLogo from '../../../../assets/images/fpo/sponsor-logo.svg';
import wireLogo from '../../../../assets/images/fpo/wirestory-logo.jpg';
import authorImage from '../../../../assets/images/fpo/deidrebosa.jpg';
import featuredImage from '../../../../assets/images/fpo/featuredimage.jpg';
import boardroomImage from '../../../../assets/images/fpo/boardroom.jpg';
import accentureLogo from '../../../../assets/images/fpo/accenture-consulting-logo.jpg';

const mocks = {
  id: 104314759,
  type: 'mockerynewsstory',
  native: false,
  premium: false,
  socialtoolsEnabled: true,
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo:
        'https://qa-aws01fm.mockery.com/applications/mockery.com/resources/source_logo/2018/01/26/132195270-reuters.gif',
    },
  ],
  author: [
    {
      id: 103944451,
      name: 'Bill Smith',
      url: 'http://qa-pa13pub.mockery.com/testcreator/',
      image: {
        url: null,
      },
      sameAs: null,
      socialMediaInfo: null,
    },
  ],
  promoImage: {
    url: featuredImage,
    caption: 'Image courtesy of Getty',
  },
  featuredMedia: {
    id: 100518123,
    type: null,
    caption: 'Las Vegas Sands Corp, The Venetian.',
    copyrightHolder: 'Ricky Barnard | Wikipedia',
    representativeOfPage: true,
    url: 'http://img-static-qa1.mockery.com/image/104769012-SLSR_Dallas_exterior.jpg',
    datePublished: '2013-03-04T14:38:53+0000',
  },
  publisher: {
    name: 'MOCKERY',
    logo: 'http://sc.mockeryfm.com/applications/mockery.com/staticcontent/img/mockery-hdr-logo2.png',
  },
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image:
      'https://fm.mockery.com/applications/mockery.com/resources/styles/skin/special-reports/the-pulse/pulse-1market-header-2800.jpg',
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const noImageHeader = {
  id: 104314759,
  type: 'mockerynewsstory',
  native: false,
  premium: false,
  socialtoolsEnabled: true,
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  author: [
    {
      id: 103944451,
      name: 'Bill Smith',
      url: 'http://qa-pa13pub.mockery.com/testcreator/',
      image: {
        url: null,
      },
      sameAs: null,
      socialMediaInfo: [
        {
          type: 'twitter',
          url: 'http://twitter.com',
          displayText: '@helloooo',
        },
      ],
    },
  ],
  promoImage: null,
  featuredMedia: null,
  publisher: {
    name: 'MOCKERY',
    logo: 'http://sc.mockeryfm.com/applications/mockery.com/staticcontent/img/mockery-hdr-logo2.png',
  },
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image:
      'https://fm.mockery.com/applications/mockery.com/resources/styles/skin/special-reports/the-pulse/pulse-1market-header-2800.jpg',
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const noImageHeaderTwoAuthors = {
  id: 104314759,
  type: 'mockerynewsstory',
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  author: [
    {
      id: 104799799,
      name: 'Sharon L. Lynch',
      url: 'http://qa-pa14pub.mockery.com/sharon-l-lynch/',
      image: { url: authorImage },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'https://twitter.com/sharonlynch',
          displayText: 'sharonlynch',
          type: 'twitter',
        },
      ],
    },
    {
      id: 123456789,
      name: 'Deirdre Bosa',
      url: 'http://qa-pa14pub.mockery.com/sharon-l-lynch/',
      image: { url: authorImage },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'https://twitter.com/deirdebosa',
          displayText: 'deirdebosa',
          type: 'twitter',
        },
      ],
    },
  ],
  promoImage: {
    url: featuredImage,
    caption: 'Image courtesy of Getty',
  },
  featuredMedia: null,
  publisher: {
    name: 'MOCKERY',
    logo: 'http://sc.mockeryfm.com/applications/mockery.com/staticcontent/img/mockery-hdr-logo2.png',
  },
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image:
      'https://fm.mockery.com/applications/mockery.com/resources/styles/skin/special-reports/the-pulse/pulse-1market-header-2800.jpg',
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const noImageHeaderWithWire = {
  id: 104314759,
  type: 'mockerynewsstory',
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  author: [
    {
      id: 104799799,
      name: 'Sharon L. Lynch',
      url: 'http://qa-pa14pub.mockery.com/sharon-l-lynch/',
      image: { url: authorImage },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'https://twitter.com/sharonlynch',
          displayText: 'sharonlynch',
          type: 'twitter',
        },
      ],
    },
  ],
  promoImage: null,
  featuredMedia: null,
  publisher: {
    name: 'REUTERS',
    logo: wireLogo,
  },
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image:
      'https://fm.mockery.com/applications/mockery.com/resources/styles/skin/special-reports/the-pulse/pulse-1market-header-2800.jpg',
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const imageHeader = {
  id: 104314759,
  type: 'mockerynewsstory',
  native: false,
  premium: false,
  socialtoolsEnabled: true,
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  author: [
    {
      id: 103944451,
      name: 'Bill Smith',
      url: 'http://qa-pa13pub.mockery.com/testcreator/',
      image: {
        url: null,
      },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'http://twitter.com',
          type: 'twitter',
          displayText: '@billsmith',
        },
      ],
    },
  ],
  promoImage: {
    url: featuredImage,
    caption: 'Image courtesy of Getty',
  },
  featuredMedia: {
    id: 100518123,
    type: null,
    caption: 'Las Vegas Sands Corp, The Venetian.',
    copyrightHolder: 'Ricky Barnard | Wikipedia',
    representativeOfPage: true,
    url: 'http://img-static-qa1.mockery.com/image/104769012-SLSR_Dallas_exterior.jpg',
    datePublished: '2013-03-04T14:38:53+0000',
  },
  publisher: null,
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image: boardroomImage,
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const imageHeaderFullAuthor = {
  id: 104314759,
  type: 'mockerynewsstory',
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  author: [
    {
      id: 123456789,
      name: 'Deirdre Bosa',
      url: 'http://qa-pa14pub.mockery.com/sharon-l-lynch/',
      image: {
        url:
          'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/08/23/104668777-BOSA_D_9.333x14.240x240.jpg?v=1503511700',
      },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'https://twitter.com/deirdebosa',
          displayText: 'deirdebosa',
          type: 'twitter',
        },
      ],
    },
  ],
  promoImage: {
    url: featuredImage,
    caption: 'Image courtesy of Getty',
  },
  featuredMedia: {
    id: 100518123,
    type: null,
    caption: 'Las Vegas Sands Corp, The Venetian.',
    copyrightHolder: 'Ricky Barnard | Wikipedia',
    representativeOfPage: true,
    url: 'http://img-static-qa1.mockery.com/image/104769012-SLSR_Dallas_exterior.jpg',
    datePublished: '2013-03-04T14:38:53+0000',
  },
  publisher: {
    name: 'MOCKERY',
    logo: 'http://sc.mockeryfm.com/applications/mockery.com/staticcontent/img/mockery-hdr-logo2.png',
  },
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image: boardroomImage,
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const videoHeader = {
  id: 104314759,
  type: 'mockerynewsstory',
  native: false,
  premium: false,
  socialtoolsEnabled: true,
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casinor gambling: Analyst',
  author: null,
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  featuredMedia: {
    id: 100518123,
    type: null,
    url: 'http://mockery.com/test.mov',
    datePublished: '2013-03-04T14:38:53+0000',
  },
  promoImage: {
    url: featuredImage,
    caption: 'Image courtesy of Getty',
  },
  publisher: {
    name: 'MOCKERY',
    logo: 'http://sc.mockeryfm.com/applications/mockery.com/staticcontent/img/mockery-hdr-logo2.png',
  },
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image:
      'https://fm.mockery.com/applications/mockery.com/resources/styles/skin/special-reports/the-pulse/pulse-1market-header-2800.jpg',
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const articleMedMockHeader = {
  id: 104314759,
  type: 'mockerynewsstory',
  native: false,
  premium: false,
  socialtoolsEnabled: false,
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  author: [
    {
      id: 103944451,
      name: 'Bill Smith',
      url: 'http://qa-pa13pub.mockery.com/testcreator/',
      image: {
        url: null,
      },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'http://twitter.com',
          type: 'twitter',
          displayText: '@firstadopter',
        },
      ],
    },
    {
      id: 103944451,
      name: 'Jarold Harkness',
      url: 'http://qa-pa13pub.mockery.com/testcreator/',
      image: {
        url: null,
      },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'http://twitter.com',
          type: 'twitter',
          displayText: '@jdog',
        },
      ],
    },
  ],
  promoImage: null,
  featuredMedia: {
    id: 100518123,
    type: null,
    caption: 'Las Vegas Sands Corp, The Venetian.',
    copyrightHolder: 'Ricky Barnard | Wikipedia',
    representativeOfPage: true,
    url: 'http://img-static-qa1.mockery.com/image/104769012-SLSR_Dallas_exterior.jpg',
    datePublished: '2013-03-04T14:38:53 GMT',
  },
  publisher: null,
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image:
      'https://fm.mockery.com/applications/mockery.com/resources/styles/skin/special-reports/the-pulse/pulse-1market-header-2800.jpg',
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const articleBrandedMockHeader = {
  id: 104314759,
  type: 'mockerynewsstory',
  native: true,
  premium: false,
  socialtoolsEnabled: true,
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  author: [],
  promoImage: {
    url: featuredImage,
    caption: 'Image courtesy of Getty',
  },
  featuredMedia: {
    id: 100518123,
    type: null,
    caption: 'Las Vegas Sands Corp, The Venetian.',
    copyrightHolder: 'Ricky Barnard | Wikipedia',
    representativeOfPage: true,
    url: 'http://img-static-qa1.mockery.com/image/104769012-SLSR_Dallas_exterior.jpg',
    datePublished: '2013-03-04T14:38:53+0000',
  },
  publisher: {
    name: 'Accenture Consulting',
    logo: accentureLogo,
  },
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image:
      'https://fm.mockery.com/applications/mockery.com/resources/styles/skin/special-reports/the-pulse/pulse-1market-header-2800.jpg',
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const articleProMockHeader = {
  id: 104314759,
  type: 'mockerynewsstory',
  native: false,
  premium: true,
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  author: [
    {
      id: 103944451,
      name: 'Bill Smith',
      url: 'http://qa-pa13pub.mockery.com/testcreator/',
      image: {
        url: null,
      },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'http://twitter.com',
          type: 'twitter',
          displayText: '@firstadopter',
        },
      ],
    },
  ],
  promoImage: null,
  featuredMedia: {
    id: 100518123,
    type: null,
    caption: 'Las Vegas Sands Corp, The Venetian.',
    copyrightHolder: 'Ricky Barnard | Wikipedia',
    representativeOfPage: true,
    url: 'http://img-static-qa1.mockery.com/image/104769012-SLSR_Dallas_exterior.jpg',
    datePublished: '2013-03-04T14:38:53+0000',
  },
  publisher: null,
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image:
      'https://fm.mockery.com/applications/mockery.com/resources/styles/skin/special-reports/the-pulse/pulse-1market-header-2800.jpg',
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

const creatorOverwriteAsAuthor = {
  id: 104314759,
  type: 'mockerynewsstory',
  datePublished: '2017-03-02T06:16:15 GMT',
  dateModified: '2018-02-07T03:19:16 GMT',
  datePublishedFormatted: '2017-03-02T06:16:15 GMT',
  dateLastPublishedFormatted: '2018-02-07T03:19:16 GMT',
  description:
    "Casino operators globally are eyeing entry into Japan, but one analyst said Japanese lawmakers may adopt Singapore's methods in limiting gambling. ",
  headline: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  title: 'Japan may pull a Singapore in controlling casino gambling: Analyst',
  creatorOverwrite: 'Thomas Baldwin',
  sourceOrganization: [
    {
      id: '80000008',
      url: null,
      name: 'Reuters',
      logo: wireLogo,
    },
  ],
  author: [
    {
      id: 104799799,
      name: 'Sharon L. Lynch',
      url: 'http://qa-pa14pub.mockery.com/sharon-l-lynch/',
      image: { url: authorImage },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'https://twitter.com/sharonlynch',
          displayText: 'sharonlynch',
          type: 'twitter',
        },
      ],
    },
    {
      id: 123456789,
      name: 'Deirdre Bosa',
      url: 'http://qa-pa14pub.mockery.com/sharon-l-lynch/',
      image: { url: authorImage },
      sameAs: null,
      socialMediaInfo: [
        {
          url: 'https://twitter.com/deirdebosa',
          displayText: 'deirdebosa',
          type: 'twitter',
        },
      ],
    },
  ],
  promoImage: {
    url: featuredImage,
    caption: 'Image courtesy of Getty',
  },
  featuredMedia: null,
  publisher: {
    name: 'MOCKERY',
    logo: 'http://sc.mockeryfm.com/applications/mockery.com/staticcontent/img/mockery-hdr-logo2.png',
  },
  section: {
    id: 10001165,
    color: '#1FF1C8',
    name: 'Casinos and Gaming',
    url: 'http://qa-pa13pub.mockery.com/id/10001165',
    image:
      'https://fm.mockery.com/applications/mockery.com/resources/styles/skin/special-reports/the-pulse/pulse-1market-header-2800.jpg',
    logo:
      'https://fm.mockery.com/applications/mockery.com/resources/img/editorial/2017/Redesign/pulse_logo.png',
  },
};

export {
  noImageHeader,
  imageHeader,
  videoHeader,
  articleMedMockHeader,
  articleBrandedMockHeader,
  articleProMockHeader,
  mocks,
  imageHeaderFullAuthor,
  noImageHeaderTwoAuthors,
  noImageHeaderWithWire,
  creatorOverwriteAsAuthor,
};

export default mocks;
