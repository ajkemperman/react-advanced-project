import { Heading, Image, Text, Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsPageItem = ({ event, categories }) => {
  return (
    <Flex
      direction="column"
      gap={1}
      borderRadius="2xl"
      w="100%"
      h="100%"
      bgColor="gray.100"
      alignItems="flex-start"
    >
      <Image
        src={event.image}
        w="100%"
        h="200px"
        alt={event.description}
        overflow="hidden"
        borderTopRadius="2xl"
        objectPosition="top"
        objectFit="cover"
      />
      <Box p={2} mt={1} textAlign="center" w="100%">
        <Heading fontSize="xl" color="gray.800" mt={1} mb={1}>
          <Link to={`event/${event.id}`}>
            <Box
              as="span"
              color="gray.800"
              _hover={{ color: "blue.500", textDecoration: "underline" }}
            >
              {event.title}
            </Box>
          </Link>
        </Heading>
        <Text color="gray.700" mb={1}>
          {event.description}
        </Text>

        <Text color="gray.600" mb={1}>
          Start time:{" "}
          {event.startTime.replace("T", " ").replace(":00.000Z", "")}
        </Text>
        <Text color="gray.600" mb={1}>
          End time: {event.endTime.replace("T", " ").replace(":00.000Z", "")}
        </Text>
        {event.categoryIds.length > 0 && (
          <>
            <Flex flexWrap="wrap" justifyContent="center" mt={2}>
              {event.categoryIds.map((categoryId) => {
                const category = categories.find(
                  (cat) => cat.id === categoryId
                );
                return (
                  category && (
                    <Text
                      key={categoryId}
                      bgColor="green.100"
                      px={2}
                      py={1}
                      fontWeight="bold"
                      textTransform="uppercase"
                      borderRadius="md"
                      mx={1}
                      mb={2}
                    >
                      {category.name}
                    </Text>
                  )
                );
              })}
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
};
