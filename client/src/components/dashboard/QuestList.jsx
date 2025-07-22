// client/src/components/dashboard/QuestList.jsx
import React from 'react';
import { Box, Heading, List, ListItem, Text, Checkbox, IconButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

const QuestList = ({ title, quests, onToggleComplete, onDelete }) => {
    return (
        <Box>
            <Heading as="h3" size="lg" my={6}>{title}</Heading>
            <List spacing={3}>
                {quests.map(quest => (
                    <ListItem key={quest._id} display="flex" alignItems="center">
                        <Checkbox isChecked={quest.isCompleted} onChange={() => onToggleComplete(quest._id)} size="lg" colorScheme="blue" />
                        <Text as={quest.isCompleted ? 's' : ''} mx={4} flex="1">{quest.title}</Text>
                        <IconButton
                            icon={<MdDelete />}
                            onClick={() => onDelete(quest._id)}
                            colorScheme="red"
                            variant="ghost"
                            aria-label="Delete quest"
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default QuestList;