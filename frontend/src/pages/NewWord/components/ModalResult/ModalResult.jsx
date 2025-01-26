import "./ModalResult.css";

export const Result = ({ imgs, setImage, setModalOpen }) => {
  return (
    <>
      <div className="m-auto Imgs">
        {imgs.map((img) => (
          <div className="Img" key={img.id}>
            <img
              src={img.content}
              alt=""
              style={{
                objectFit: "cover",
              }}
              className="mx-auto my-2 py-0"
              onClick={() => {
                setImage(img.content);
                setModalOpen(false);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
