import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Announcements from './Announcements';
import { formatMetatagDate } from 'common/utils';
import {
  getFinalAutocompleteLocations,
  getGeolocatedRegions,
} from 'common/regions';
import {
  useGeolocation,
  useGeolocationInExplore,
  useBreakpoint,
  useCountyToZipMap,
} from 'common/hooks';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import PartnersSection from 'components/PartnersSection/PartnersSection';
import CompareMain from 'components/Compare/CompareMain';
import Explore from 'components/Explore';
import { VaccinationsBanner } from 'components/Banner';
import { getFilterLimit } from 'components/Search';
import { getNationalText } from 'components/NationalText';
import HomePageHeader from 'components/Header/HomePageHeader';
import { HomepageSearchAutocomplete } from 'components/Search';
import HomepageStructuredData from 'screens/HomePage/HomepageStructuredData';
import HomepageItems from 'components/RegionItem/HomepageItems';
import {
  Content,
  SectionWrapper,
  Section,
  ColumnCentered,
} from './HomePage.style';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';
import HomepageMap from 'components/HomepageMap';

function getPageDescription() {
  const date = formatMetatagDate();
  return `${date} Explore our interactive U.S. COVID Map for the latest data on Cases, Vaccinations, Deaths, Positivity rate, and ICU capacity for your State, City, or County.`;
}

export default function HomePage() {
  const shareBlockRef = useRef(null);
  const location = useLocation();

  const isMobile = useBreakpoint(600);

  const indicatorsRef = useRef(null);

  const { geolocationData, isLoading: geoIsLoading } = useGeolocation();
  const { result: countyToZipMap, pending: zipIsLoading } = useCountyToZipMap();

  const isLoading = geoIsLoading || zipIsLoading;

  const userRegions =
    geolocationData && countyToZipMap
      ? getGeolocatedRegions(geolocationData, countyToZipMap)
      : null;

  const initialFipsForExplore = useGeolocationInExplore(5, geolocationData);

  // Location hash is uniquely set from vaccination banner button click
  const compareShowVaccinationsFirst = location.hash === '#compare';
  const compareShowVulnerabilityFirst =
    location.hash === '#compare-vulnerabilities';

  const scrollTo = (div: null | HTMLDivElement) =>
    div &&
    window.scrollTo({
      left: 0,
      top: div.offsetTop - 48,
      behavior: 'smooth',
    });

  useEffect(() => {
    if (location.pathname.includes('alert_signup') && shareBlockRef.current) {
      scrollTo(shareBlockRef.current);
    }
  }, [location.pathname, shareBlockRef]);

  const exploreSectionRef = useRef(null);

  // TODO (chelsi): add ids back in

  return (
    <>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl="/"
        pageTitle="Realtime U.S. COVID Map & Vaccine Tracker"
        pageDescription={getPageDescription()}
      />
      <HomepageStructuredData />
      <VaccinationsBanner />
      <HomePageHeader />
      <main>
        <div className="App">
          <Content>
            <ColumnCentered id="search">
              <HomepageSearchAutocomplete
                locations={getFinalAutocompleteLocations(
                  geolocationData,
                  countyToZipMap,
                )}
                filterLimit={getFilterLimit()}
              />
              <HomepageItems isLoading={isLoading} userRegions={userRegions} />
            </ColumnCentered>

            <HomepageMap />

            <Section>
              <CompareMain
                locationsViewable={8}
                vaccinesFirst={compareShowVaccinationsFirst}
                vulnerabilityFirst={compareShowVulnerabilityFirst}
              />
            </Section>
            <Section ref={exploreSectionRef}>
              <Explore
                title="Cases, Deaths and Hospitalizations"
                initialFipsList={initialFipsForExplore}
                initialChartIndigenousPopulations={false}
                nationalSummaryText={getNationalText()}
              />
            </Section>
            <SectionWrapper ref={indicatorsRef}>
              <CriteriaExplanation isMobile={isMobile} />
            </SectionWrapper>
            <Announcements />
          </Content>
          <PartnersSection />
          <div ref={shareBlockRef}>
            <ShareModelBlock />
          </div>
        </div>
      </main>
    </>
  );
}
