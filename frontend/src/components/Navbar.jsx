import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = ["Home", "Search", "Engage", "Conversations", "Enrich", "Plays"];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="white" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Image src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4LjYwMDUgNS42NzMzM0gxNS41MzYxTDE3LjEyNTEgOC4zOTY4MkwxOC42MDA1IDUuNjczMzNaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMjIuODU5MyAyMS4wNDdMMTEuOTgxMSAyLjk0OTg0TDEuMTM5MTkgMjEuMDA5MUg2Ljk0NTkzQzcuNzIwNjkgMjEuMDA5MSA4LjQ4MjgzIDIwLjgxMzUgOS4xNTY2IDIwLjQ0MjdDOS44ODQwMiAyMC4wNDE5IDEwLjQzMzEgMTkuNDYxMiAxMC44NjIzIDE4Ljc1NzRDMTEuMzY0MSAxNy45MzM4IDExLjg1MTcgMTcuMTAwNiAxMi4zNDU2IDE2LjI3MjJMMTMuNjA5NSAxNC4xNTE1TDExLjk3OTUgMTEuNDIwMUwxMS4yNTY4IDEyLjU4M0MxMC40MzMxIDEzLjk2MDYgOS42NTM2NCAxNS4zNjk2IDguNzk5OTkgMTYuNzI4MkM4LjM3MDggMTcuNDA5OSA3LjgxMDYzIDE4LjA1MzcgNi45ODM4IDE4LjIxOTRDNi44NTkxNSAxOC4yNDQ2IDYuNzMxMzQgMTguMjU3MiA2LjYwMzUzIDE4LjI2MkM2LjQzMzExIDE4LjI2ODMgNi4yNjI3IDE4LjI2NTEgNi4wOTM4NiAxOC4yNjUxTDExLjk4MTEgOC4yMzkwM0wxOS41NDA5IDIxLjA0N0gyMi44NTkzWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==" />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar bg="gray.300" size={"sm"} name="Shriram Athreya" />
              </MenuButton>
              <MenuList>
                <MenuItem>Your Profile</MenuItem>
                <MenuItem>Your Team</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
