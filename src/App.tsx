import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

import {
  Box,
  ChakraProvider,
  extendTheme,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useQuery, useSubscription } from "urql";
import { Counter } from "./components/counter";
import { DonationWizard } from "./components/DonationWizard";
import { Leaderboard } from "./components/leaderBoard";
import { Logo } from "./Logo";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
});
const TotalDonationsQuery = `
  query Query {
    totalDonations
  }
`;

const TotalUpdateQuery = `
  subscription Subscription {
    totalUpdated {
      total
    }
  }
`;
const handleSubs = (previous: any, newTotal: any) => {
  return newTotal?.totalUpdated?.total;
};
export const App = () => {
  const [{ data, fetching, error }] = useQuery({
    query: TotalDonationsQuery,
  });
  const [res] = useSubscription({ query: TotalUpdateQuery }, handleSubs);
  if (fetching) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Logo h="32" pointerEvents="none" />
            <Heading as="h1" size="xl">
              JOIN THE MOVEMENT!
            </Heading>
            <Text color="black">
              The team is growing everyday and scoring wins for the planet.
              <br /> Remove trash with us and track our progress!
            </Text>

            <Heading as="h2" size="4xl">
              <Counter from={0} to={data.totalDonations} />
            </Heading>

            <DonationWizard />

            <Leaderboard />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
