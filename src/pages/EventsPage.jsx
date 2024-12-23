import React from "react";
import { Heading, Flex, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EventsPageItem } from "../components/EventsPageItem";
import { useState } from "react";
import { TextInput } from "../components/ui/TextInput";
import { Button } from "../components/ui/Button";
import { Form } from "../components/Form";
import { postDataUsers, postDataEvents } from "../components/Api";

const BASE_URL = "http://localhost:3000";
const addEdit = "Add";

export const loader = async () => {
  try {
    const eventsResponse = await fetch(`${BASE_URL}/events`);
    const categoriesResponse = await fetch(`${BASE_URL}/categories`);
    const usersResponse = await fetch(`${BASE_URL}/users`);

    if (!eventsResponse.ok || !categoriesResponse.ok || !usersResponse.ok) {
      throw new Error("Failed to fetch one or more resources.");
    }

    const events = await eventsResponse.json();
    const categories = await categoriesResponse.json();
    const users = await usersResponse.json();

    return {
      events,
      categories,
      users,
    };
  } catch (error) {
    console.error("Error loading data:", error);
    return {
      events: [],
      categories: [],
      users: [],
      error: error.message,
    };
  }
};

export const EventsPage = () => {
  const [searchEvents, setSearchEvents] = useState("");
  const { events, categories, users } = useLoaderData();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formCategory, setFormCategory] = useState([]);
  let navigate = useNavigate();
  const [formEvents, setFormEvents] = useState({
    createdBy: "",
    title: "",
    description: "",
    image: "",
    categoryIds: "",
    location: "",
    startTime: "",
    endTime: "",
  });
  const [formUsers, setFormUsers] = useState({
    name: "",
    image: "",
  });
  const toast = useToast();
  const handleChangeFormUsers = (e) => {
    const { name, value } = e.target;
    setFormUsers((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeFormEvents = (e) => {
    const { name, value } = e.target;
    setFormEvents((prev) => ({ ...prev, [name]: value }));
  };
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleCategoryChange = (categoryId) => {
    setFormCategory(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Remove if unchecked
          : [...prev, categoryId] // Add if checked
    );
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const userExists = users.some(
      (user) =>
        user.name.trim().toLowerCase() === formUsers.name.trim().toLowerCase()
    );
    if (!userExists) {
      postDataUsers(formUsers, toast, BASE_URL);
      formEvents.createdBy = users.length + 1;
    } else {
      const existingUser = users.find(
        (user) =>
          user.name.trim().toLowerCase() === formUsers.name.trim().toLowerCase()
      );

      formEvents.createdBy = existingUser.id;
    }

    formEvents.startTime = `${startDate}T${formEvents.startTime}`;
    formEvents.endTime = `${endDate}T${formEvents.endTime}`;
    formEvents.categoryIds = formCategory;
    await postDataEvents(formEvents, toast, BASE_URL);
    handleClose();
    navigate("/");
  };

  const matchedTitles = events.filter((event) => {
    return event.title.toLowerCase().includes(searchEvents.toLowerCase());
  });
  const matchedCategory = events.filter((event) =>
    event.categoryIds.some((id) => id.toString().includes(searchEvents))
  );

  const matchedEvents = (titles, category) => {
    const mergeSearch = [...titles];

    category.forEach((category) => {
      if (!mergeSearch.includes(category)) {
        mergeSearch.push(category);
      }
    });
    return mergeSearch;
  };

  const handleChange = (event) => {
    setSearchEvents(event.target.value);
  };
  return (
    <Flex
      direction={"column"}
      bgColor="blue.200"
      alignItems="center"
      p={10}
      justifyContent="center"
    >
      <Heading size="xl" color="white" mb={8}>
        List of events
      </Heading>

      <TextInput
        placeholder=" Search on name of event"
        onChange={handleChange}
        w={{ base: "90%", md: "50%", lg: "40%" }}
        bg="white"
        mb={2}
        p={2}
        borderRadius="2xl"
      />
      <Flex flexWrap="wrap" justifyContent="center" mb={8}>
        <Text fontSize="20" mr={4} alignContent="center">
          Filter on categories:
        </Text>

        {categories.map((category) => {
          return (
            <Button
              key={category.id}
              mr={2}
              onClick={() => setSearchEvents(category.id.toString())}
              textTransform={"capitalize"}
            >
              {category.name}{" "}
            </Button>
          );
        })}
        <Button bgColor="yellow.400" onClick={() => setSearchEvents("")}>
          Reset Search
        </Button>
      </Flex>
      <Flex mb={4}>
        <Button onClick={handleOpen} colorScheme="teal" bgColor="red">
          Add Event
        </Button>
        <Form
          isOpen={isOpen}
          onClose={handleClose}
          formUsers={formUsers}
          formEvents={formEvents}
          formCategory={formCategory}
          categories={categories}
          startDate={startDate}
          endDate={endDate}
          handleChangeFormUsers={handleChangeFormUsers}
          handleChangeFormEvents={handleChangeFormEvents}
          handleCategoryChange={handleCategoryChange}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleSubmitForm={handleSubmitForm}
          addEdit={addEdit}
        />
      </Flex>

      {searchEvents ? (
        <>
          {matchedEvents(matchedTitles, matchedCategory).length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 2, xl: 4 }}
              gap={6}
              mb={4}
            >
              {matchedEvents(matchedTitles, matchedCategory).map((item) => (
                <EventsPageItem
                  key={item.id}
                  event={item}
                  categories={categories}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text size="xl" color="white" height="400">
              No Matches Found.
            </Text>
          )}
        </>
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2, xl: 4 }}
            spacing={6}
            mb={4}
          >
            {events.map((item) => (
              <EventsPageItem
                key={item.id}
                event={item}
                categories={categories}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Flex>
  );
};
