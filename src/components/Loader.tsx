import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type LoaderProps = {
  fontSize?: "text-2xl" | "text-3xl";
  circularProgressSize?: number;
};

export default function Loader({
  fontSize,
  circularProgressSize,
}: LoaderProps) {
  return (
    <div className="flex justify-center items-center">
      <p className={`text-white ${fontSize || "text-5xl"}`}>Loading...</p>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={circularProgressSize || 90} />
      </Box>
    </div>
  );
}
