import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import roboPunksNFT from "../RoboPunksNTF.json";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

const roboPunksNFTAddress = "sefser";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log(
          "🚀 ~ file: MainMint.jsx ~ line 23 ~ handleMint ~ response",
          response
        );
      } catch (error) {
        console.log(
          "🚀 ~ file: MainMint.jsx ~ line 30 ~ handleMint ~ error",
          error
        );
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000">
            RoboPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000"
          >
            It's 2077. Can the RoboPunks save humans from aliens?{" "}
          </Text>
        </div>

        {isConnected ? (
          <>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#d6517d"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="#fff"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintAmount}
              />
              <Button
                backgroundColor="#d6517d"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="#fff"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#d6517d"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              color="#fff"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}
            >
              Mint Now
            </Button>
          </>
        ) : (
          <p>You must be connected to Mint.</p>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
