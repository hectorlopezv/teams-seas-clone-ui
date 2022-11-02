import { Avatar } from "@chakra-ui/avatar";
import { Badge, Flex, Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { Donation } from "./types";
import formatDate from "./utils";

interface Props {
  donation: Donation;
}

export const LeaderboardItem = ({ donation }: Props) => {
  return (
    <Flex
      boxShadow="md"
      p={3}
      bg="white"
      borderRadius="lg"
      maxWidth="xl"
      w="100%"
    >
      <Avatar size="lg" />
      <Box flex="1" ml={4}>
        <Flex justifyContent="space-between" h="100%">
          <Flex flexDirection="column" justifyContent="center" textAlign="left">
            <Text
              color="black"
              fontWeight="bold"

              fontSize="sm"
              textTransform="uppercase"
            >
              {donation.team}
            </Text>
            <Text fontWeight="bold" color="black">{donation.displayName}</Text>
            <Text fontSize="sm" color="black">{donation.message}</Text>
          </Flex>

          <Flex
            flexDirection="column"
            justifyContent="space-around"
            textAlign="right"
          >
            <div>
              <Badge
                colorScheme="blue"
                borderRadius="full"
                textTransform="lowercase"
                py={1}
                px={3}
                as="div"
              >
                {donation.count.toLocaleString()} pounds
              </Badge>
            </div>
            <Text fontSize="xs" color="black">{formatDate(donation.createdAt)}</Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
