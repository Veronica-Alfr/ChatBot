import React from "react";
import { useParams } from "react-router-dom";
import { useMessages } from '../api/requests';
import { useQueryClient } from "@tanstack/react-query";
import { IMessage } from "../interface/IMessage";

const Messages: React.FC = () => {
  const queryClient = useQueryClient();

  const apiKey = queryClient.getQueryData<string>(['apiKey']);
  const { contactId } = useParams<{ contactId: string }>();

  if (!apiKey) {
    return <div>You need login!</div>;
    // melhoria: redirecionar para a tela de login, mas caso tenha vindo da tela /contacts, deve aparecer um popup
    // com a msg: "You need login!"
  }

  if (!contactId) {
    return <div>Invalid contactId</div>;
  }

  const {data: messages, error } = useMessages (apiKey, contactId);

  if (error) {
    return <div className="text-red-500">Error: {(error as Error).message}</div>;
  }

  const allMessages = messages?.data.resource.items || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 p-4 rounded shadow py-6 bg-gray-150">
        <h1 className="text-3xl font-bold font-mulish text-gray-800 text-shadow">
          History Messages
        </h1>
      </div>
      <ul className="space-y-4">
        {allMessages.map((message: IMessage) => (
          <li key={message.id} className="bg-purple-100 p-3 rounded-lg shadow relative max-w-md mx-auto">
            <div className="text-lg font-semibold mb-1">{message.content}</div>
            <div className="absolute bottom-1 right-2 text-xs text-gray-500">{message.from}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
