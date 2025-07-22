// client/src/components/dashboard/StatusPanel.jsx
import React from 'react';
import { Box, Heading, Text, Progress, List, ListItem, Button } from '@chakra-ui/react';

const StatusPanel = ({ user, onAllocateStat }) => {
    return (
        <Box>
            <Heading as="h1" size="xl" color="brand.gold">Status Window</Heading>
            <Text fontSize="lg">Hunter: {user.username} (Level: {user.level})</Text>

            <Box my={4}>
                <Text>XP: {user.xp} / {user.xpToNextLevel}</Text>
                <Progress value={user.xp} max={user.xpToNextLevel} colorScheme="blue" size="sm" />
            </Box>

            <Box my={8}>
                <Heading as="h3" size="lg">Stats ({user.stats.unspentPoints} points available)</Heading>
                <List spacing={3} mt={4}>
                    <ListItem>Strength: {user.stats.strength} {user.stats.unspentPoints > 0 && <Button size="xs" ml={4} onClick={() => onAllocateStat('strength')}>+</Button>}</ListItem>
                    <ListItem>Agility: {user.stats.agility} {user.stats.unspentPoints > 0 && <Button size="xs" ml={4} onClick={() => onAllocateStat('agility')}>+</Button>}</ListItem>
                    <ListItem>Stamina: {user.stats.stamina} {user.stats.unspentPoints > 0 && <Button size="xs" ml={4} onClick={() => onAllocateStat('stamina')}>+</Button>}</ListItem>
                    <ListItem>Intelligence: {user.stats.intelligence} {user.stats.unspentPoints > 0 && <Button size="xs" ml={4} onClick={() => onAllocateStat('intelligence')}>+</Button>}</ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default StatusPanel;