import { Loader } from "@/components";

export default function loading() {
  return (
    <div className="bg-black w-screen h-screen flex-col-center space-y-12">
      <Loader color="white" size="large" />
    </div>
  );
}
