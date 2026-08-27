import AddRoomForm from "@/components/home/AddRoomForm";


export const metadata = {
  title: "StudyNook – Add Room",
};

export default function AddRoomPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">
          Add New Room
        </h1>

        <AddRoomForm />
      </div>
    </main>
  );
}