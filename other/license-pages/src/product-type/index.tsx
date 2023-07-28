import { FC } from "react";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useProductTypes } from "./hook";
import {
  Divider,
  FeaturesWrapper,
  StyledCard,
  StyledCardContent,
  StyledCardsWrapper,
  StyledCardWrapper,
  SubscribeButton,
  TitleTypography,
} from "./styled";

export interface IProductTypeSelectionProps {
  internal?: boolean;
}

export const ProductTypeSelection: FC<IProductTypeSelectionProps> = props => {
  const { internal = false } = props;
  const productTypes = useProductTypes({ internal });

  return (
    <StyledCardsWrapper container justifyContent="center" spacing={2}>
      {productTypes.map((type, index) => (
        <StyledCardWrapper item xs={12} sm={6} md={4} key={index}>
          <StyledCard>
            <StyledCardContent>
              <TitleTypography variant="h6">{type.title}</TitleTypography>
              <Divider />
              <FeaturesWrapper>{type.text}</FeaturesWrapper>
              {internal ? (
                <SubscribeButton component={RouterLink} to={type.link} size="large" variant="contained">
                  {type.linkTitle}
                </SubscribeButton>
              ) : (
                <SubscribeButton
                  component={Link}
                  href={type.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  variant="contained"
                >
                  {type.linkTitle}
                </SubscribeButton>
              )}
            </StyledCardContent>
          </StyledCard>
        </StyledCardWrapper>
      ))}
    </StyledCardsWrapper>
  );
};
