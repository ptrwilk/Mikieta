import { useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const useSignalR = (id: number, onStatusChanges: () => void) => {
  useEffect(() => {
    (async () => {
      const connection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_URL}/messageHub`, {
          withCredentials: false,
        })
        .withAutomaticReconnect()
        .build();

      connection.on("OrderChanged", () => {
        onStatusChanges?.();
      });

      await connection.start().then(() => {
        connection.invoke("Join", id);
      });

      return () => {
        connection.stop();
      };
    })();
  }, []);
};
