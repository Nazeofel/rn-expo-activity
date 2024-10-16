import Activity from "@/components/Activity";
import { DiscordContextProvider } from "@/hooks/useDiscordSdk";

export default function HomeScreen() {
  return (
    <DiscordContextProvider authenticate scope={["identify", "guilds"]}>
      <Activity />
    </DiscordContextProvider>
  );
}
