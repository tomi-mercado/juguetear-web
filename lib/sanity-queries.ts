import { groq } from "next-sanity";

const sanityImageProjection = groq`{
  ...,
  'placeholder': asset -> metadata.lqip
}`;

export const layoutQuery = groq`
  *[_type == 'layout'][0] {
    navbarLinks[] -> {
      "name": title,
      "url": path
    },
    footerLinks[] { 
      _type != 'pageRef' => { name, url },
      _type == 'pageRef' => @-> { "name": title, "url": path }
    }
  }
`;

export const homePageQuery = groq`
  *[_type == 'homePage'][0] {
    ...,
    heroSection {
      ...,
      photo ${sanityImageProjection},
    },
    twoImagesSection {
      ...,
      photos[] ${sanityImageProjection},
    },
    featuredToysSection {
      ...,
      toys[] -> {
        ...,
        images[] -> ${sanityImageProjection},
        characteristics[] -> {
          ...,
          category->
        }
      }
    },
    cooperateSection {
      ...,
      blocks[] {
        ...,
        image ${sanityImageProjection},
      }
    }
  }
`;

export const aboutPageQuery = groq`
  *[_type == 'aboutPage'][0] {
    ...,
    team[] ->
  }
`;

export const toyQuery = groq`
  *[_type == 'toy']`;

export const toySlugQuery = groq`
  *[_type == 'toy' && slug.current == $slug]`;
