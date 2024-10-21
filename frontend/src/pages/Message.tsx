import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessages } from "../api/requests";
import { IMessage } from "../interface/IMessage";
// import { messagesMock } from "../tests/messages/mocks/messagesMock";

const Messages: React.FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const apiKey = localStorage.getItem("token") || "";
      if (!contactId) {
        setError("Contact ID is missing");
        navigate("/");
        return;
      }

      const response = await getMessages(apiKey, contactId);

      setMessages(response.data.resource.items);
    } catch (error) {
      setError("Failed to fetch messages");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [contactId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="bg-white p-4 rounded shadow">
            <div>
              <strong>From:</strong> {message.from}
            </div>
            <div>
              <strong>To:</strong> {message.to}
            </div>
            <div>
              <strong>Content:</strong> {message.content}
            </div>
          </li>
        ))}
      </ul>
      {/* <ul>
        {
          messagesMock.resource.items.map((message) => (
            <li key={message.id} className="flex justify-start">
              <div className="max-w-xs p-4 mb-2 rounded-lg shadow bg-purple-500 text-white">
                <div>
                  <strong>From:</strong> {message.from}
                </div>
                <div>
                  <strong>To:</strong> {message.to}
                </div>
                <div>
                  <strong>Content:</strong> {message.content}
                </div>
              </div>
            </li>
          ))
        }
      </ul> */}
    </div>
  );
};

export default Messages;
