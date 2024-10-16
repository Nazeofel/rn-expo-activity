import { DiscordContextProvider, useDiscordSdk } from "@/hooks/useDiscordSdk";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Activity() {
  const { authenticated, discordSdk, status } = useDiscordSdk();
  const [channelName, setChannelName] = useState<string>();

  useEffect(() => {
    console.log("ITS ANNOYING THAT YOU DONT SAY IT WITH CHEST");
    // Requesting the channel in GDMs (when the guild ID is null) requires
    // the dm_channels.read scope which requires Discord approval.
    if (!authenticated || !discordSdk.channelId || !discordSdk.guildId) {
      return;
    }

    // Collect channel info over RPC
    // Enable authentication to see it! (App.tsx)
    discordSdk.commands
      .getChannel({ channel_id: discordSdk.channelId })
      .then((channel) => {
        if (channel.name) {
          setChannelName(channel.name);
        }
      });
  }, [authenticated, discordSdk]);

  return (
    <View>
      <Text style={{ color: "white", fontSize: "64px" }}>{channelName}</Text>
    </View>
  );
}
