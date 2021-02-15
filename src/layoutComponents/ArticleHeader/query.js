const query = `
  ...on articleHeader {
    id
    brand
    type
    url
    native
    premium
    datePublished
    dateModified
    dateLastPublished
    datePublishedFormatted
    dateLastPublishedFormatted
    description
    socialtoolsEnabled
    shortestHeadline
    headline
    title
    native
    socialMediaInfo {
      type
      url
      displayText
    }
    sourceOrganization {
      id
      type
      url
      name
      logo
      creatorOverwrite
    }
    creatorOverwrite
    author {
      id
      name
      url
      image
      sameAs
      socialMediaInfo {
        url
        displayText
        type
      }
    }
    promoImage {
      id
      url
      caption
    }
    featuredMedia {
      id
      url
      ... on image {
        id
        type
        caption
        headline
        copyrightHolder
        url
        datePublished
        isHighTouch
      }
      ... on mockeryvideo {
        id
        type
        url
        datePublished
      }
    }
    publisher {
      name
      logo
    }
    section {
      id
      brand
      type
      color
      name
      eyebrow
      shortestHeadline
      url
      subType
      section {
        subType
      }
      image {
        id
        url
      }
      logo {
        id
        url
      }
    }
  }
`

export default query;
