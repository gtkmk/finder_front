import { Button, Container, Stack } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container maxWidth='lg'>
        <Stack direction='column' spacing={2}>
          <div>
            <Button variant='contained' color='primary'>
              primary
            </Button>
          </div>
          <div>
            <Button variant='contained' color='secondary'>
              secondary
            </Button>
          </div>          
        </Stack>
      </Container>
    </>
  );
}
