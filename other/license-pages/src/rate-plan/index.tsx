import { FC } from "react";
import { Grid } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Clear, Done } from "@mui/icons-material";

import {
  Divider,
  FeatureIconExcluded,
  FeatureIconIncluded,
  FeatureIconWrapper,
  FeaturesWrapper,
  FeatureTypography,
  FeatureWrapper,
  MonthTypography,
  PriceTypography,
  PriceWrapper,
  StyledCard,
  StyledCardContent,
  StyledCardWrapper,
  TitleTypography,
} from "./styled";

const ratePlans = [
  {
    title: "bronze",
    price: "2000",
    features: [
      { name: "erc20", included: true },
      { name: "erc721", included: true },
      { name: "erc1155", included: true },
      { name: "vesting", included: true },
      { name: "disperse", included: true },
      { name: "claim", included: true },
      { name: "grade", included: true },
      { name: "craft", included: true },
      { name: "mystery", included: false },
      // { name: "breeding", included: false },
      // { name: "drop", included: false },
      // { name: "rent", included: false },
      // { name: "wrapper", included: false },
      // { name: "collection", included: false },
      // { name: "voucher", included: false },
      // { name: "merge", included: false },
    ],
  },
  {
    title: "silver",
    price: "5000",
    features: [
      { name: "erc20", included: true },
      { name: "erc721", included: true },
      { name: "erc1155", included: true },
      { name: "vesting", included: true },
      { name: "disperse", included: true },
      { name: "claim", included: true },
      { name: "grade", included: true },
      { name: "craft", included: true },
      { name: "mystery", included: true },
    ],
  },
  {
    title: "gold",
    price: "9000",
    features: [
      { name: "erc20", included: true },
      { name: "erc721", included: true },
      { name: "erc1155", included: true },
      { name: "vesting", included: true },
      { name: "disperse", included: true },
      { name: "claim", included: true },
      { name: "grade", included: true },
      { name: "craft", included: true },
      { name: "mystery", included: true },
    ],
  },
];

export const RatePlansSelection: FC = () => {
  return (
    <Grid container justifyContent="center" spacing={2}>
      {ratePlans.map((plan, index) => (
        <StyledCardWrapper item xs={12} sm={6} md={4} key={index}>
          <StyledCard>
            <StyledCardContent>
              <TitleTypography variant="h6">
                <FormattedMessage id={`pages.ratePlan.${plan.title}.title`} />
              </TitleTypography>
              <PriceWrapper>
                <PriceTypography variant="h3">${plan.price}</PriceTypography>
                <MonthTypography>
                  {" / "}
                  <FormattedMessage id="pages.ratePlan.month" />
                </MonthTypography>
              </PriceWrapper>
              <Divider />
              <FeaturesWrapper>
                {plan.features.map((feature, index) => (
                  <FeatureWrapper key={index}>
                    <FeatureIconWrapper>
                      {feature.included ? (
                        <FeatureIconIncluded component={Done} />
                      ) : (
                        <FeatureIconExcluded component={Clear} />
                      )}
                    </FeatureIconWrapper>
                    <FeatureTypography included={feature.included}>
                      <FormattedMessage id={`pages.ratePlan.${plan.title}.${feature.name}`} />
                    </FeatureTypography>
                  </FeatureWrapper>
                ))}
              </FeaturesWrapper>
            </StyledCardContent>
          </StyledCard>
        </StyledCardWrapper>
      ))}

      <StyledCardWrapper item xs={12}>
        <StyledCard>
          <StyledCardContent>
            <TitleTypography variant="h6">
              <FormattedMessage id="pages.ratePlan.onDemand.title" />
            </TitleTypography>
            <Divider />
            <Grid container spacing={{ sm: 0, md: 4 }} justifyContent="center">
              <Grid item xs={12} sm={6} md={4} justifyContent="center">
                <FeatureWrapper sx={{ justifyContent: "center" }}>
                  <FeatureIconWrapper>
                    <FeatureIconIncluded component={Done} />
                  </FeatureIconWrapper>
                  <FeatureTypography included>
                    <FormattedMessage id="pages.ratePlan.onDemand.waitList" />
                  </FeatureTypography>
                </FeatureWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} justifyContent="center">
                <FeatureWrapper sx={{ justifyContent: "center" }}>
                  <FeatureIconWrapper>
                    <FeatureIconIncluded component={Done} />
                  </FeatureIconWrapper>
                  <FeatureTypography included>
                    <FormattedMessage id="pages.ratePlan.onDemand.raffle" />
                  </FeatureTypography>
                </FeatureWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} justifyContent="center">
                <FeatureWrapper sx={{ justifyContent: "center" }}>
                  <FeatureIconWrapper>
                    <FeatureIconIncluded component={Done} />
                  </FeatureIconWrapper>
                  <FeatureTypography included>
                    <FormattedMessage id="pages.ratePlan.onDemand.staking" />
                  </FeatureTypography>
                </FeatureWrapper>
              </Grid>
            </Grid>
          </StyledCardContent>
        </StyledCard>
      </StyledCardWrapper>

      <StyledCardWrapper item xs={12}>
        <StyledCard>
          <StyledCardContent>
            <TitleTypography variant="h6">
              <FormattedMessage id="pages.ratePlan.alwaysIncluded.title" />
            </TitleTypography>
            <Divider />
            <Grid container spacing={{ sm: 0, md: 4 }} justifyContent="center">
              <Grid item xs={12} sm={6} md={4} justifyContent="center">
                <FeatureWrapper sx={{ justifyContent: "center" }}>
                  <FeatureIconWrapper>
                    <FeatureIconIncluded component={Done} />
                  </FeatureIconWrapper>
                  <FeatureTypography included>
                    <FormattedMessage id="pages.ratePlan.alwaysIncluded.history" />
                  </FeatureTypography>
                </FeatureWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} justifyContent="center">
                <FeatureWrapper sx={{ justifyContent: "center" }}>
                  <FeatureIconWrapper>
                    <FeatureIconIncluded component={Done} />
                  </FeatureIconWrapper>
                  <FeatureTypography included>
                    <FormattedMessage id="pages.ratePlan.alwaysIncluded.openSea" />
                  </FeatureTypography>
                </FeatureWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={4} justifyContent="center">
                <FeatureWrapper sx={{ justifyContent: "center" }}>
                  <FeatureIconWrapper>
                    <FeatureIconIncluded component={Done} />
                  </FeatureIconWrapper>
                  <FeatureTypography included>
                    <FormattedMessage id="pages.ratePlan.alwaysIncluded.insights" />
                  </FeatureTypography>
                </FeatureWrapper>
              </Grid>
            </Grid>
          </StyledCardContent>
        </StyledCard>
      </StyledCardWrapper>
    </Grid>
  );
};
