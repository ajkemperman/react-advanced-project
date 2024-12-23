import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Checkbox,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export const Form = ({
  isOpen,
  onClose,
  formUsers,
  formEvents,
  categories,
  formCategory,
  startDate,
  endDate,
  handleChangeFormUsers,
  handleChangeFormEvents,
  handleCategoryChange,
  setStartDate,
  setEndDate,
  handleSubmitForm,
  addEdit,
}) => {
  // State for validation errors
  const [errors, setErrors] = useState({});

  // Validation Function
  const validateForm = () => {
    const newErrors = {};

    if (!formUsers.name) newErrors.name = "Name is required.";
    if (!formUsers.image) newErrors.userImage = "Image URL is required.";
    if (!formEvents.title) newErrors.title = "Event title is required.";
    if (!formEvents.description)
      newErrors.description = "Description is required.";
    if (!formEvents.image)
      newErrors.eventImage = "Event image URL is required.";
    if (!formEvents.location) newErrors.location = "Location is required.";
    if (!startDate) newErrors.startDate = "Start date is required.";
    if (!formEvents.startTime) newErrors.startTime = "Start time is required.";
    if (!endDate) newErrors.endDate = "End date is required.";
    if (!formEvents.endTime) newErrors.endTime = "End time is required.";

    if (formCategory.length === 0)
      newErrors.categories = "Please select at least one category.";

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const checkSubmitForm = (e) => {
    const isValid = validateForm();

    if (isValid) {
      handleSubmitForm(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {addEdit} Event {formEvents.title}:
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* User Details */}
          <FormControl mb={4} isRequired isInvalid={errors.name}>
            <FormLabel>Full name of user</FormLabel>
            <Input
              name="name"
              value={formUsers.name}
              onChange={handleChangeFormUsers}
              type="text"
              placeholder=" Change name of creator"
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired isInvalid={errors.image}>
            <FormLabel>Image of user</FormLabel>
            <Input
              name="image"
              value={formUsers.image}
              onChange={handleChangeFormUsers}
              type="text"
              placeholder="Change image URL (http://...) of creator"
            />
            <FormErrorMessage>{errors.image}</FormErrorMessage>
          </FormControl>
          {/* Event Details */}
          <FormControl mb={4} isRequired isInvalid={errors.title}>
            <FormLabel>Event Title</FormLabel>
            <Input
              name="title"
              value={formEvents.title}
              onChange={handleChangeFormEvents}
              type="text"
              placeholder="Event Title"
            />
            <FormErrorMessage>{errors.title}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired isInvalid={errors.description}>
            <FormLabel>Description of event</FormLabel>
            <Input
              name="description"
              value={formEvents.description}
              onChange={handleChangeFormEvents}
              type="text"
              placeholder="Event Description"
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired isInvalid={errors.eventImage}>
            <FormLabel>Image of event</FormLabel>
            <Input
              name="image"
              value={formEvents.image}
              onChange={handleChangeFormEvents}
              type="text"
              placeholder="Enter event image URL (http://...)"
            />
            <FormErrorMessage>{errors.eventImage}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired isInvalid={errors.categories}>
            <FormLabel>Select categories</FormLabel>
            <Flex wrap="wrap" flexDirection="column">
              {categories.map((category) => (
                <Flex key={category.id} mb={2} flexDir="row">
                  <Checkbox
                    value={category.id}
                    isChecked={formCategory.some((cat) => cat === category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <Text ml={2} textTransform="capitalize">
                    {category.name}
                  </Text>
                </Flex>
              ))}
            </Flex>
            <FormErrorMessage>{errors.categories}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired isInvalid={errors.location}>
            <FormLabel>Location of event</FormLabel>
            <Input
              name="location"
              value={formEvents.location}
              onChange={handleChangeFormEvents}
              type="text"
              placeholder="Event Location"
            />
            <FormErrorMessage>{errors.location}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired isInvalid={errors.startDate}>
            <FormLabel>Start Date</FormLabel>
            <Input
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
            />
            <FormErrorMessage>{errors.startDate}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired isInvalid={errors.startTime}>
            <FormLabel>Start Time</FormLabel>
            <Input
              name="startTime"
              value={formEvents.startTime}
              onChange={handleChangeFormEvents}
              type="time"
            />
            <FormErrorMessage>{errors.startTime}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired isInvalid={errors.endDate}>
            <FormLabel>End Date</FormLabel>
            <Input
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
            />
            <FormErrorMessage>{errors.endDate}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isRequired isInvalid={errors.endTime}>
            <FormLabel>End Time</FormLabel>
            <Input
              name="endTime"
              value={formEvents.endTime}
              onChange={handleChangeFormEvents}
              type="time"
            />
            <FormErrorMessage>{errors.endTime}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={checkSubmitForm}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
