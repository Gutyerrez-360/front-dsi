import React, { useEffect } from 'react';
import { ApiAuth } from '../../../../api/Auth.api';
import { map } from 'lodash';
import { UserItem } from '../UserItem';
import {
  Typography,
  Tab,
  Tabs,
  Box,
  CircularProgress,
  Grid,
  Button,
} from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDebounce, useUser } from '../../../../hooks';
import { SearchInput } from '../../../../shared/components/SearchInput';
import { useSearchParams } from 'react-router-dom';

const authController = new ApiAuth();

export function ListUsers() {
  const [query] = useSearchParams();
  const search = query.get('search');

  const accessToken = authController.getAccessToken();

  const deboncedQuery = useDebounce(search, 500);

  const { isLoading, users, hasNextPage, fetchNextPage, isFetching, refetch } =
    useUser({
      accessToken,
      search: deboncedQuery,
    });

  useEffect(() => {
    refetch();
  }, [deboncedQuery]);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item>
            <Tabs value={0} aria-label='basic tabs example'>
              <Tab
                icon={<PeopleOutlineIcon />}
                label='Usuarios'
                {...a11yProps(0)}
              />
            </Tabs>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {/* Espacio flexible */}
          </Grid>
          <Grid item>
            <SearchInput isFetching={isFetching} />
          </Grid>
        </Grid>
      </Box>
      <br />
      <div
        style={{
          margin: '16px',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <InfiniteScroll
          dataLength={users.length}
          hasMore={hasNextPage || isLoading}
          next={() => fetchNextPage()}
          scrollThreshold={0.5}
        >
          {map(users, (user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </InfiniteScroll>
      </div>
      {hasNextPage & !isFetching ? (
        <Button onClick={() => fetchNextPage()}>Cargar más usuarios</Button>
      ) : undefined}
      {isFetching ? <CircularProgress /> : undefined}
      {!hasNextPage & (users.length !== 0) ? (
        <Typography style={{ textAlign: 'center', fontWeight: 500 }}>
          Ya tienes todos los usuarios cargados
        </Typography>
      ) : undefined}
      {users.length === 0 ? (
        <Typography style={{ textAlign: 'center', fontWeight: 500 }}>
          No hay usuarios {search ? 'con este filtro' : undefined}
        </Typography>
      ) : undefined}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
