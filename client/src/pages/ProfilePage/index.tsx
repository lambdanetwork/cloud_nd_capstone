import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonLabel,
  IonIcon,
  IonButton,
  IonAvatar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import tutorAPI from "../../api/tutorAPI";
import { Tutor } from "../../types/tutor";
import "./index.css";
import {
  CameraResultType,
  CameraSource,
  Camera,
} from "@capacitor/core";
import { camera } from "ionicons/icons";
import { UserAPI } from "../../api";

const defaultAvatar =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHEBAPEhISEBITFRAPEBESFQ8QEBAQFRIWGBUWFhUYHS0gGBolGxMVITEhJSkrOi4uFx8zODMvNygtLi0BCgoKDg0OGhAQFSslHyItLS0tLS0rLS0vLS0tKy0tLSstLS0uLy0tKy0tLSstLS0tLS0tLS0tLS0tKy0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADsQAAIBAQQFCgUCBQUAAAAAAAABAgMEBREhEjFBUZEGEzJSYXGBobHRFiJCcsEU0mKCkqLhI0OywvD/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAgMEAQX/xAAsEQEAAwABAwQCAQMEAwAAAAAAAQIRAwQhMRITQVEUMoEiYXEVobHBBUJS/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAADVO0Qp65xj3tI7kz8GtTvCiv8Ach/Umd9FvpzYFeNF/wC5Dih6LfRsNkLXTnqnB90os56Z+jW5PE46AAAAAAAAAAAAAAAAAAAAAAAMZzVNYtpLa28EBGWm/aVLKONR9mUeLLY4pnyjNoRle/K1TVhBdixfFlkcVYR9UuGraJ1ulOUu9vDgTiIjxDmtR1wAAAM6dSVLoyce5tehyY112UL4r0vq0luksfPWQnjrLvqlJWblBGWU4uPavmXDX6kJ4p+EoslaFohaFjGSkuzZ3rYVTEx5S1tOAAAAAAAAAAAAAAAAA8bwzAiLdfkaeMafzvrPoru3lteKZ8ozZBWi0ztLxnJy9F3LYXxWI8ITOtJ1wAAAAAAAAAAMqdR0njFuL3p4M5Ma6mbDfzjgqqxXXWvxW3wKrcX0lFvtO0asa6UotST2opmJjymzOAAAAAAAAAAAAAGm12qFkjpSeC2La3uSO1rM+HJnFYvC85214dGGyK29+801pFUJnXCTRAAAAAAAAAAAAAAAN9ktc7JLSi8N6+l96I2rE+XYnFnu68oW5dWa1xfqt6M9qTVZE67SDoAAAAAAAAAAc1vtsbFHSebfRjtk/btJVrNpcmcVO12mdrlpSeexbEtyNNaxEZCE92kk4AAAAAAAAAAAAAAAAAHsJum1JPBrNNa0cdWe6L0VsWhLKouElvXb2Ge9PT3hOJSZW6AAAAAAAAabZaY2SDnLUtS2t7EjtY2cFQtdpla5ucnnsWxLcjVWsRGQhLSScAAAAAAAAAAAAAAAAAAAA9hJwaaeDWaa1ph1a7pvBW2ODynHpLf2oy3p6ZSiXeQdAAAAAA8bwzAqV7W522eXQjlFb+3xNVK+mHJcJNwAAAAAAAAAAAAAAAAAAAAAA22avKzSU461wa2pnJjYwXGy2iNqhGcdT8ntRkmMnEm44AAAAAhuUVs5qKpLXLOXZHd4lvFXZ0Vw0GAMAYAwBgDAGAMAY7ruuydtz6MOs9vctpC14qJ2jctCnri5vfJv0WRTPJaRnUuihP6MO1No5HJb7EReFySoJyg3OK1r6l7lteXfIiC0wBgDAGAMAYAwBgDErcFt5ifNvoz1dk9nHVwKuSuxos5nAAAAxnNU05PJJNt9iApdrtDtM5Te18FsXA1xGRiWNJ0wBgDAGAMAYAwBjtuqxfrZ4PorOb7N3iRvb0wStsIqCSSwSySWpIyosgAACuX/AHeqL52KwTeE1ulv8S/jtvaXYQxa7gDAGAMAYAwBgDDHAGLldlq/V0oy29GX3LX7+JlvXJxGXURAABFcorRzVLQWubw/lWb/ABxLOKNnUqwrBoTwBgDAGAMAYAwBgDFruGz8zRT2z+d92zy9TPyTsq58pErcAAADXaaKtEJQeqSa/wAnYnJ0UicXBtPWm0+9GtY8DuAMAYAwBgDAGAMTPJq0aE5U3qksV9y/x6FXLHbUbQsZQgAAKtyhrc5W0dkEo+LzfquBo447Lax2RhYlgDAGAMAYAwBgDHgMXqjDm4xjuSXBGSfKhmcAAAAAU29oaFeqv4seKx/Jqp+sLq+HKSdwBgDAGAMAYAwBjbZK36epCfVab7tvlicmNjHJhdzIpAAFHtVTnqk5b5Sfhjka4jIaYjIajruAMAYAwBgDAGAMAYvdKWnFPek/IxyysgAAAAAp17y069V9uHBJfg1U/WGisdnGSSwBgDAGAMAYAwBgDF0u2rz1GnL+FJ96yfmjLaMmWe0ZLpIotVqnzcJy3Rk+COx5diNlR0a2vAGAMAYAwBgDAGAMAYt1yV+fow3x+R+GrywM14yzNyRlneQQAAADCrUVKLk9STb7kdiNdiNUipN1JOT1tuT728TXHZriMYAwBgDAGAMAYAwBgDFq5Oz0qCW6Ul54/kz8n7M/LH9STK1blvR4Uav2S9CVP2hKn7QphqbcAYAwBgDAGAMAYAwBiRuS3fo54S6EsE+x7GV3rsK+SnqhbNZnZAAAAgeUVvWHMxeeTn2bl+S7jr8r+Kn/ALSgC5owBgDAGAMAYAwBgDAGLLyYeNKf3v8A4oo5fLNzeUwVKXLeqxoVftl6EqftCfH+0KYam7AGAMAYAwBgDAGAMAYAxL3Re0qDjSknOLajHrRxeXeiq9Inup5OKJ7wsxQyAEPfd6Ssj5uKwk1jpvYnislvyLaU3vK/i4ot3lWm8c3m9be1l7VgDAGAMAYAwBgDAGAMAYsnJhf6c/v/AOqKOXyy8/7QmSpQ022OnSqLfCa/tZ2vlKk5aFHNT0segwBgDAGAMAYAwBgDGdGjKu9GMXJ7l+dwmYjy5MxXvKfuu5OYaqVHjJZxitSe9vaU25N7QycnNvaqbKmcAj71uxW9Jp6M0sE9jW5k6X9K3i5fR/hWbXYqlkfzxaWyWuL8S+LRPhsretvEtB1PAGAMAYAwBgDAGAMAYtHJuOjRx3yk/Rfgo5PLF1H7pUrUDzAolaHNSlHqtx4PA1x3etHeNYB3AGAMAYAwBgDHsU5NJLFvJJZtsOJ277h0sJVcv4Fr8X7FVuT6ZeTqPiqco0Y0FoxiorcsiqZ1km0zOy2HHAAAA8lFSWDWK2p5oCIt1xQq4un8kt30P2LK8kx5aKdRMdrd1dtFCVnk4yWi1/7Fby+JifDbWYtGw1hLAGAMAYAwBgDAGLlc9PmqFNdml/U8fyZrztpeZzTt5dhFWAVG/qPM15bpYTXjr80zRxztXp9PPq44R5NdgDAGAMAYAwBi03JdissVOS/1Hv8AoW7vKL33tDzufm9U5HhKlbOAAAAAAAAct4WGNuhovJ/TLbF+3YSraYlZx8k0nYU6vSlQk4SWDTwZpidepWYtGwwDuAMAYAwBgDGVGm60oxWuTUV4vATOOW7Rq9wjoJJalgkZHjzOvQAEJyns+lCNRfS9F9z1efqW8U98bOjt3mquFz0MAYAwBgDAGJC4rN+prLHVH534avP0IXnIZ+pv6af5W4zvLAAAAAAAAAACv8p7NhoVV9kvVfnyLuKfhu6O/mqBLW7AGAMAYAwBiU5O2fnq2lsgsf5nkvy/AhyTkMvVW9NM+1qM7zQABqtNFWiEoPVJNd25nYnJ1KlpraLQpFWm6UnF5NNp96NUTr24nY2GAdAAAABYeS0Mqku2MeCb/JTyy8/rZ7xCeKmEAAAAAAAAAAOC/IadCp2YS4NE6fsv6ac5YU80PXAAAAAAt1xWX9NSTfSn877ti4epnvOy8nqeT1X7fCRIM4AAAV3lLY9FqstTwjPv2P8AHgi7jt8PR6Ll2PRP8IItb8AYAwBgDHdYL0nYYuMVFpvSeli3jglsfYQtWLKOXp68k7My6viKt1afCX7jntwq/B4/uT4irdWnwl+4e3B+Dx/cnxFW6tPhL9w9uD8Hj+5PiKt1afCX7h7cH4PH9yfEVbq0+Ev3D24PweP7k+IqvVp8Je49uD8Gn3J8RVerT4S9x7cH4NPuT4iq9Wnwl7j24PwafcnxFV6tPhL3Htwfg0+5PiKr1afCXuPbg/Bp9y12i/KlohKDjDCSaeCljn4iOOInUqdHStotEz2RZY1YAwBgDAGO657H+sqJPox+afdsXj7kL2yFHUcnt0/vPhcTO8YAAAAGFekq8XCSxTWDOxOJVtNZiYUq3WWVjm4PZqfWjsZoidjXucXJHJX1Q0HVgAAAAAAAAAAAAAAAAAAAAAB7CLm0ksW8klrbDk5EbK5XVYlYaaj9Tzm979kZ7W2Xic/L7l9+Ph2EVIAAAAAHDe13q3w3TWcH+H2MlS2S0dPzzxW/t8qfODptxawayaetM0PbiYmNh4ddAAAAAAAAAAAAAAAAAAAAAxZLguzmlz018z6Cf0rf3spvbe0PK6zqPV/RXx8psqYAAAAAAAACLvm6lbVpxwVRcJrc+3tJ0vjZ0vU+3Ppt4/4VWcXBtNNNZNPJpl72YmJjYeAAAAAAAAAAAAAAAAAAABPXJdGlhVqLLXCD29r9iq9/iHndX1Wf0U/mVhKnlgAAAAAAAAABH3pdUbcsV8s1qlv7GTrfGrp+qtxTnmFVtNmnZZaM1g/JrentRfExPh7PHyV5I2stQTAAAAAAAAAAAAAAAPYQc2kk23kks22HJmIjZWO6bkVLCpVzlrUNaj2veyq1/iHldT1nq/p4/H2myp54AAAAAAAAAAAAGm1WaFqjozWK812p7DsTMeFnHyW452sq5b7jnZ8ZQxqR3fWvDb4F1eSJ8vV4etpftbtP+yJeRNtAAAAAAAAAAAAA7rBdVW2YNLRj1pavBbSNrxDPzdVTi7TOz9LLYLtp2FfKsZbZvW/ZFNrTLyObqL8s9/H07CKgAAAAAAAAAAAAAAAAclsu6lbOlHPrLKXHb4kotML+LqOTj/Wf4Qtq5PThnTkprc/ll7PyLI5I+Xocf/kKz+8Yi69lqWfpwlHtay46icTE+GynLS/621pOpgAAAAAZ0qUqzwjFye5Jv0EzjlrVr3tOJKzXDWrdLCmu3OXBEJ5Ihk5Ou46+O6Zsdy0bNm1py3yzS7lqK5vMsHL1nJftuR/ZIkGQAAAAAAAAAAAAAAAAAAAAAA5a130a2unHvSwfFEotMfK6vUctfFpcs7hoS1KUe6T/ADid9yV0ddyx8xP8NT5OUutPjH2O+5Kf+ocn1DxcnKXXn/b7D3JP9Q5P/mGyHJ+hHXpvvfsh7koz1/LP06aV1UKWqnF/djL1IzeftVbquW3m3/TsjFQWCSS3LJEVEzM+XocAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z";

const addPhotoToGallery = async () => {
  const uploadUrl = await UserAPI.generateProfileUploadUrl();
  console.log(uploadUrl);
  // Take a photo
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100,
  });

  // upload to generateUrl
  console.log(capturedPhoto);
  // upload to generateUrl
  console.log(capturedPhoto);
};

const saveForm = async (user: Tutor) => {
  // if it's create
  const query = window.location.search.split("?")[1];
  const isCreate =
    query &&
    query.split("&").filter((query) => {
      const [key, value] = query.split("=");
      if (key === "create" && String(value) === "true") {
        return key;
      }
    }).length > 0;

  if (isCreate) {
    createUser(user);
  } else {
    updateUser(user);
  }
};

const createUser = (user: Tutor) => {};

const updateUser = (user: Tutor) => {};

export const ProfilePage: React.FC = () => {
  const [detail, setDetail] = useState<Tutor>(new Tutor());

  useEffect(() => {
    // fetch API
    (async function didMount() {
      const detail = await tutorAPI.getById();
      if (!detail) return;
    })();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile-avatar">
          <IonAvatar>
            <img src={detail.photo || defaultAvatar} alt="avatar"/>
          </IonAvatar>
        </div>
        <IonItem>
          <IonLabel>User Name</IonLabel>
          <IonInput
            value={detail.username}
            placeholder="Enter Input"
            onIonChange={() => {}}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Phone Number</IonLabel>
          <IonInput
            value={detail.phoneNumber}
            placeholder="Enter Input"
            onIonChange={() => {}}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Photo</IonLabel>
          <IonButton onClick={addPhotoToGallery}>
            <IonIcon icon={camera}></IonIcon>
          </IonButton>
        </IonItem>
        {/* <IonItemDivider></IonItemDivider> */}
        <IonButton onClick={() => saveForm(detail)}>Save</IonButton>
      </IonContent>
    </IonPage>
  );
};

/**
 * 1. fetch tutor
 * 2. can fetch only tutor, but not student
 *
 */
