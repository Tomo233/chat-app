import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <div className="bg-backgroundColor h-screen flex justify-center items-center">
      <p className="text-white text-5xl">Loading...</p>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={90} />
      </Box>
    </div>
  );
}
