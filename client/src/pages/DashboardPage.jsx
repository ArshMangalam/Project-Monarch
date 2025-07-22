 // client/src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Select, Input, Button } from '@chakra-ui/react';

import PenaltyZone from '../components/PenaltyZone';
import StatusPanel from '../components/dashboard/StatusPanel';
import QuestList from '../components/dashboard/QuestList';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [quests, setQuests] = useState([]);
    const [newQuestTitle, setNewQuestTitle] = useState('');
    const [newQuestType, setNewQuestType] = useState('DAILY');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    const fetchQuests = async () => {
        try {
            const res = await axios.get('/api/quests', config);
            setQuests(res.data);
        } catch (error) {
            console.error('Could not fetch quests', error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        const fetchUserData = async () => {
            try {
                const res = await axios.get('/api/user/me', config);
                setUser(res.data);
                await fetchQuests();
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        fetchUserData();
    }, [navigate, token]);

    const handleCreateQuest = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      try {
        const config = { headers: { 'x-auth-token': token } };
        const body = { title: newQuestTitle, type: newQuestType };
        await axios.post('/api/quests', body, config);
        setNewQuestTitle('');
        await fetchQuests(token); // Refresh quest list
      } catch (error) {
        console.error('Error creating quest', error);
      }
    };
    const handleToggleComplete = async (id) => {
        try {
            await axios.put(`/api/quests/${id}`, {}, config);
            // Instead of re-fetching all quests, just update the local state
            setQuests(quests.map(q => q._id === id ? { ...q, isCompleted: !q.isCompleted } : q));
            // We'll need to re-fetch user data to update XP
            const res = await axios.get('/api/user/me', config);
            setUser(res.data);
        } catch (error) {
            console.error('Error updating quest', error);
        }
    };
    const handleDeleteQuest = async (id) => {
      const token = localStorage.getItem('token');
      try {
        const config = { headers: { 'x-auth-token': token } };
        await axios.delete(`/api/quests/${id}`, config);
        await fetchQuests(token);
      } catch (error) {
        console.error('Error deleting quest', error);
      }
    };
  
    const handleAllocateStat = async (stat) => {
      const token = localStorage.getItem('token');
      try {
          const config = { headers: { 'x-auth-token': token } };
          const body = { statToIncrease: stat };
          const res = await axios.put('/api/user/allocate-stat', body, config);
          setUser(res.data); // Update user state with the new stats
      } catch (error) {
          console.error('Error allocating stat point', error);
          alert(error.response.data.msg);
      }
    };
  
    const handleClearPenalty = async () => {
      const token = localStorage.getItem('token');
      try {
          const config = { headers: { 'x-auth-token': token } };
          const res = await axios.put('/api/user/clear-penalty', {}, config);
          setUser(res.data); // Update user state to reflect the change
      } catch (error) {
          console.error('Error clearing penalty', error);
      }
    };

    if (!user) return <Box bg="brand.900" minH="100vh" color="white" p={8}>Loading...</Box>;

    return (
        <Box bg="brand.900" minH="100vh" color="white" p={8}>
            {user.isInPenaltyZone && <PenaltyZone onClearPenalty={handleClearPenalty} />}

            <Box style={{ filter: user.isInPenaltyZone ? 'blur(5px)' : 'none' }}>
                <StatusPanel user={user} onAllocateStat={handleAllocateStat} />

                <Box as="form" onSubmit={handleCreateQuest} my={8}>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <Input
                            placeholder="Enter quest title"
                            value={newQuestTitle}
                            onChange={(e) => setNewQuestTitle(e.target.value)}
                            bg="brand.800"
                            borderColor="brand.700"
                            required
                        />
                        <Select
                            value={newQuestType}
                            onChange={(e) => setNewQuestType(e.target.value)}
                            bg="brand.800"
                            borderColor="brand.700"
                        >
                            <option style={{ backgroundColor: '#2d3748' }} value="DAILY">Daily</option>
                            <option style={{ backgroundColor: '#2d3748' }} value="MAIN">Main</option>
                        </Select>
                        <Button type="submit" colorScheme="blue">Add Quest</Button>
                    </Stack>
                </Box>

                <QuestList
                    title="Daily Quests"
                    quests={quests.filter(q => q.type === 'DAILY')}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteQuest}
                />

                <QuestList
                    title="Main Quests"
                    quests={quests.filter(q => q.type === 'MAIN')}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteQuest}
                />
            </Box>
        </Box>
    );
};

export default DashboardPage;