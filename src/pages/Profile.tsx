
import MainLayout from "@/components/layout/MainLayout";
import ProfileForm from "@/components/profile/ProfileForm";

const Profile = () => {
  return (
    <MainLayout>
      <div className="container mx-auto max-w-2xl py-12">
        <ProfileForm />
      </div>
    </MainLayout>
  );
};

export default Profile;
