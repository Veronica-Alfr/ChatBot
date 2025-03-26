import React from "react";
import { useParams } from "react-router-dom";
import { useMessages, validateApiKey } from '../api/requests';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IMessage } from "../interface/IMessage";

const Messages: React.FC = () => {
  const { contactId } = useParams<{ contactId: string }>();

  // const apiKey = queryClient.getQueryData<string>(['apiKey']);

  if (!contactId) {
    return <div className="text-red-500">Contact not found!</div>;
  }

  const { data: apiKey } = useQuery({
    queryKey: ['validateApiKey'],
    queryFn: validateApiKey,
  });

  // const { data: messages, error: messagesError } = useMessages(apiKey, contactId);

  // if (messagesError) {
  //   return <div className="text-red-500">Error: {(messagesError as Error).message}</div>;
  // }

  // const allMessages = messages?.data.resource.items || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 p-4 rounded shadow py-6 bg-gray-150">
        <h1 className="text-3xl font-bold font-mulish text-gray-800 text-shadow">
          History Messages
        </h1>
      </div>
      <ul className="space-y-4">


      </ul>
    </div>
  );
};

export default Messages;
