import React, { Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import LogoGrid, { LogoGridItem } from 'components/LogoGrid/LogoGrid';
import {
  AboutHeading1,
  AboutHeading2,
  HashWrapper,
  PartnersSectionWrapper,
} from './About.style';
import aboutContent from 'cms-content/about';
import { MarkdownContent } from 'components/Markdown';
import PageContent from 'components/PageContent';
import { TocItem } from 'cms-content/utils';
import TeamSection from './Team/TeamSection';
import { StyledGridContainer } from './About.style';

export const sidebarItems: TocItem[] = [
  {
    label: 'About',
    to: '/about',
    items: [
      {
        to: '/about#mission',
        label: 'Our mission',
      },
      {
        to: '/about#contact-us',
        label: 'Contact us',
      },
      {
        to: '/about#partners',
        label: 'Who we work with',
      },
      {
        to: '/about#who-we-serve',
        label: 'Who we serve',
      },
      {
        to: '/about#team',
        label: 'Who we are',
      },
      {
        to: '/about#join-us',
        label: 'Join us',
      },
    ],
  },
];

// TODO(Chelsi): put these ids into the CMS

const About = () => {
  return (
    <Fragment>
      <AppMetaTags
        canonicalUrl="/about"
        pageTitle="About Covid Act Now"
        pageDescription="Covid Act Now is a multidisciplinary team of technologists, epidemiologists, and health experts working to help Americans understand  COVID risk in their own community."
      />
      <PageContent sidebarItems={sidebarItems}>
        <AboutHeading1>{aboutContent.pageHeader}</AboutHeading1>
        <AboutHeading2 id="mission">{aboutContent.introHeader}</AboutHeading2>
        <MarkdownContent source={aboutContent.introContent} />
        <AboutHeading2 id="contact-us">
          {aboutContent.contactUsHeader}
        </AboutHeading2>
        <MarkdownContent source={aboutContent.contactUsContent} />
        <AboutHeading2 id="partners">
          {aboutContent.partnersHeader}
        </AboutHeading2>
        {aboutContent.partnersContent.map((section: any, idx: number) => {
          return (
            <Fragment key={`Partner-section-${idx}`}>
              <MarkdownContent source={section.copy} />
              <StyledGridContainer
                container
                spacing={1}
                alignItems="center"
                justify="center"
              >
                {section.logos.map((logo: any, i: number) => (
                  <LogoGridItem
                    image={logo.image}
                    url={logo.url}
                    altText={logo.altText}
                    key={logo.altText}
                  />
                ))}
              </StyledGridContainer>
            </Fragment>
          );
        })}
        <AboutHeading2 id="who-we-serve">
          {aboutContent.whoWeServeHeader}
        </AboutHeading2>
        <PartnersSectionWrapper>
          <MarkdownContent source={aboutContent.whoWeServeContentA} />
          <LogoGrid logos={aboutContent.governmentLogos} />
          <MarkdownContent source={aboutContent.whoWeServeContentB} />
        </PartnersSectionWrapper>
        <HashWrapper id="team">
          <AboutHeading2>{aboutContent.teamHeader}</AboutHeading2>
          <MarkdownContent source={aboutContent.teamIntro} />
          <TeamSection />
        </HashWrapper>
        <AboutHeading2 id="join-us">{aboutContent.joinUsHeader}</AboutHeading2>
        <MarkdownContent source={aboutContent.joinUsContent} />
      </PageContent>
    </Fragment>
  );
}; 

export default About;
