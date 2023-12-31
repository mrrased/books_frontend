/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { usePostBookMutation } from '@/redux/Features/Books/BooksApi';
import toast, { Toaster } from 'react-hot-toast';

interface formType {
  // message?: any;
  title: string;
  author: string;
  genre: string;
  year: string;
}

interface PType {
  error?: any;
  data?: any;
}

export default function AddNewBook() {
  const [data, setData] = useState<formType>({
    title: '',
    author: '',
    genre: '',
    year: '',
  });

  const [postBook] = usePostBookMutation();

  // Handle Change Function
  const InputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Form handling Area
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    await postBook(data).then((result: PType) => {
      if (result?.data?.statusCode === 200) {
        toast.success(result.data.message);
        setData({
          title: '',
          author: '',
          genre: '',
          year: '',
        });
      } else {
        toast.error(result.error.data.message);
      }
    });
  };

  return (
    <div className="mt-5">
      <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>
        Add New Book
      </Typography>
      <Card sx={{ padding: '10px 5px', maxWidth: 450, margin: ' 0 auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
                  required
                  id="filled-basic"
                  label="Name"
                  variant="filled"
                  name="title"
                  onChange={InputValue}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  required
                  id="filled-basic"
                  label="author"
                  type="name"
                  variant="filled"
                  name="author"
                  onChange={InputValue}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  required
                  id="filled-basic"
                  label="genre"
                  type="name"
                  variant="filled"
                  name="genre"
                  onChange={InputValue}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  id="filled-basic"
                  label="year"
                  type="name"
                  variant="filled"
                  name="year"
                  onChange={InputValue}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
