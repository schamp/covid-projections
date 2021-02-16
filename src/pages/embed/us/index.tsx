import React from 'react';
import {
  US_MAP_EMBED_HEIGHT,
  US_MAP_EMBED_WIDTH,
} from 'screens/Embed/EmbedEnums';
import { EmbedContainer } from 'screens/Embed/Embed.style';
import { EmbedFooter } from 'screens/Embed/Embed';
import SocialLocationPreview from 'components/SocialLocationPreview/SocialLocationPreview';

function EmbedPage() {
  return (
    <EmbedContainer height={US_MAP_EMBED_HEIGHT} width={US_MAP_EMBED_WIDTH}>
      <SocialLocationPreview border isEmbed Footer={EmbedFooter} />
    </EmbedContainer>
  );
}

export default EmbedPage;
