export const postDataUsers = async (users, toast, BASE_URL) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(users),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add user: ${response.status} ${response.statusText}`
      );
    }

    toast({
      title: "Success!",
      description: "Adding the user was successful.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    return await response.json();
  } catch (error) {
    console.error("Error posting user data:", error);
    toast({
      title: "Error!",
      description: "An error occurred while adding user data.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    return { error: error.message };
  }
};

export const postDataEvents = async (events, toast, BASE_URL) => {
  try {
    const response = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      body: JSON.stringify(events),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    if (!response.ok) {
      throw new Error("Failed to post event data.");
    } else {
      toast({
        title: "Success!",
        description: "Adding the event was successful.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting event data:", error);
    toast({
      title: "Error!",
      description: "Adding the event was unsuccessful.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    return { error: error.message };
  }
};

export const putDataUsers = async (userId, user, toast, BASE_URL) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update user: ${response.status} ${response.statusText}`
      );
    }

    toast({
      title: "Success!",
      description: "Updating the user was successful.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating user data:", error);
    toast({
      title: "Error!",
      description: "An error occurred while updating user data.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    return { error: error.message };
  }
};

export const putDataEvents = async (eventId, event, toast, BASE_URL) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`, {
      method: "PUT",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update event: ${response.status} ${response.statusText}`
      );
    }

    toast({
      title: "Success!",
      description: "Updating the event was successful.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating event data:", error);
    toast({
      title: "Error!",
      description: "An error occurred while updating the event.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    return { error: error.message };
  }
};

export const deleteEvent = async (eventId, toast, BASE_URL) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the event.");
    }

    toast({
      title: "Success!",
      description: "Deleting the event was successful.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    toast({
      title: "Error!",
      description: "An error occurred while deleting the event.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
};
