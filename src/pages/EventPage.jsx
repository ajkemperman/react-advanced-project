import React from "react";
import { useState, useEffect } from "react";
import {
  Heading,
  Flex,
  Image,
  Box,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Form } from "../components/Form";
import { postDataUsers, putDataUsers, putDataEvents } from "../components/Api";

const BASE_URL = "http://localhost:3000";
const addEdit = "Edit";

export const loader = async ({ params }) => {
  try {
    const eventResponse = await fetch(`${BASE_URL}/events/${params.eventId}`);
    const categoriesResponse = await fetch(`${BASE_URL}/categories`);
    const usersResponse = await fetch(`${BASE_URL}/users`);

    if (!eventResponse.ok || !categoriesResponse.ok || !usersResponse.ok) {
      throw new Error("Failed to fetch one or more resources.");
    }

    const event = await eventResponse.json();
    const categories = await categoriesResponse.json();
    const users = await usersResponse.json();

    return {
      event,
      categories,
      users,
    };
  } catch (error) {
    console.error("Error loading data:", error);
    return {
      event: null,
      categories: [],
      users: [],
      error: error.message,
    };
  }
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: isDeleteDialogOpen,
    onOpen: onDeleteDialogOpen,
    onClose: onDeleteDialogClose,
  } = useDisclosure();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let navigate = useNavigate();
  const [formEvents, setFormEvents] = useState({
    createdBy: event.createdBy,
    title: event.title,
    description: event.description,
    image: event.image,
    categoryIds: event.categoryIds,
    location: event.location,
    startTime: "",
    endTime: "",
  });
  const [formUsers, setFormUsers] = useState({
    id: null,
    name: "",
    image: "",
  });
  const [formCategory, setFormCategory] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const splitStartTime = event.startTime.split("T");
    setStartDate(splitStartTime[0]);
    const splitEndTime = event.endTime.split("T");
    setEndDate(splitEndTime[0]);
    const startTime = splitStartTime[1].replace(":00.000Z", "");
    const endTime = splitEndTime[1].replace(":00.000Z", "");

    setFormEvents((prev) => ({
      ...prev,
      startTime,
      endTime,
    }));

    const filteredUser = users.find((user) => user.id === event.createdBy);
    setFormUsers({
      id: filteredUser.id,
      name: filteredUser.name,
      image: filteredUser.image,
    });

    setFormCategory([...event.categoryIds]);
  }, [event, users]);

  const handleChangeFormUsers = (e) => {
    const { name, value } = e.target;
    setFormUsers((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeFormEvents = (e) => {
    const { name, value } = e.target;
    setFormEvents((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (categoryId) => {
    setFormCategory(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Remove if unchecked
          : [...prev, categoryId] // Add if checked
    );
  };
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!formUsers.id) {
      const newUser = await postDataUsers(formUsers, toast, BASE_URL);
      formEvents.createdBy = newUser.id;
    } else {
      await putDataUsers(formUsers.id, formUsers, toast, BASE_URL);
      formEvents.createdBy = formUsers.id;
    }

    formEvents.startTime = `${startDate}T${formEvents.startTime}`;
    formEvents.endTime = `${endDate}T${formEvents.endTime}`;
    formEvents.categoryIds = formCategory;

    const updatedEvent = await putDataEvents(
      event.id,
      formEvents,
      toast,
      BASE_URL
    );
    if (updatedEvent) {
      handleClose();
      navigate(`/event/${event.id}`, { replace: true });
    }
  };
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${BASE_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the event.");
      } else {
        toast({
          title: "Success!",
          description: "Deleting the event was successful.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
      onDeleteDialogClose();
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error!",
        description: "An Error occured when deleting the event.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex width="100%" bgColor="blue.200" height="100%">
      <Flex
        direction="column"
        maxWidth="800px"
        borderRadius="2xl"
        bgColor="gray.100"
        p={8}
        gap={4}
        mx="auto"
        key={event.id}
      >
        <Image
          src={event.image}
          width="100%"
          height="100%"
          alt={event.description}
          borderTopRadius="2xl"
        />
        <Box textAlign="center">
          <Heading fontSize="2xl" color="gray.800" mb={4}>
            {event.title}
          </Heading>
          <Text color="gray.700" mb={4}>
            {event.description}
          </Text>
          <Text color="gray.600" mb={1}>
            Start time:{" "}
            {event.startTime.replace("T", " ").replace(":00.000Z", "")}
          </Text>
          <Text color="gray.600" mb={1}>
            End time: {event.endTime.replace("T", " ").replace(":00.000Z", "")}
          </Text>

          {event.categoryIds && event.categoryIds.length > 0 && (
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
          )}
        </Box>

        {users && (
          <Box mt={6} textAlign="center">
            <Heading fontSize="lg" color="gray.800" mb={2}>
              Created by:
            </Heading>
            <Flex
              flexWrap="wrap"
              gap={2}
              alignContent="center"
              justifyContent="center"
            >
              {users
                .filter((user) => user.id === event.createdBy)
                .map((user) => (
                  <Text
                    key={user.id}
                    bgColor="blue.100"
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {user.name}
                    <Box
                      as="img"
                      src={user.image}
                      alt={`${user.name}'s avatar`}
                      borderRadius="100%"
                      maxWidth="200px"
                      maxHeight="200px"
                    />
                  </Text>
                ))}
            </Flex>
          </Box>
        )}
        <Flex
          mb={8}
          flexWrap="wrap"
          alignContent="center"
          justifyContent="center"
          gap={4}
        >
          <Button onClick={handleOpen} colorScheme="red">
            Edit details event
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
          <Button onClick={onDeleteDialogOpen} colorScheme="red" mx={4}>
            Delete this event
          </Button>

          <AlertDialog
            isOpen={isDeleteDialogOpen}
            onClose={onDeleteDialogClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Event: {event.title}
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can not undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={onDeleteDialogClose}>Cancel</Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteEvent(event.id)}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Flex>
      </Flex>
    </Flex>
  );
};
