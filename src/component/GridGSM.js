import React, { useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";

const GridGSM = (props) => {
  const upper = (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  return (
    <div>
      <div className="row">
        {props.gsm_class.map((guru) => (
          <div key={guru._id} className="col-md-3">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                {guru.officer ? (
                  <div
                    style={{
                      position: "absolute",
                      right: "15px",
                    }}
                  >
                    <Icon
                      disabled={false}
                      title="Pengurus"
                      icons="fas fa-star"
                    />
                  </div>
                ) : null}

                <div className="text-center">
                  <Image
                    cloudName="alryntocloud"
                    upload_preset="smgtdepok"
                    publicId={guru.image}
                  >
                    <Transformation
                      width="100"
                      height="100"
                      gravity="face"
                      crop="fill"
                      radius="max"
                    />
                  </Image>
                </div>
                <h3 className="profile-username text-center">
                  {upper(guru.full_name)}
                </h3>
                <p className="text-muted text-center">
                  Kelas {guru.priority_class}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                  className="btn-group btn-group-sm"
                >
                  <div>
                    <a
                      className="btn btn-info"
                      onClick={() => props.handleClickDetail(guru._id)}
                    >
                      <i className="fas fa-eye"></i>
                      Detail
                    </a>
                  </div>
                  <div>
                    <a
                      className="btn btn-danger"
                      onClick={() => props.handleClickEdit(guru._id)}
                    >
                      <i className="fas fa-pen"></i>
                      Edit
                    </a>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "5px",
                  }}
                >
                  <Icon
                    disabled={!guru.sermon}
                    title="Pengajar"
                    icons="fas fa-user-tie"
                  />
                  <Icon
                    disabled={!guru.worship_leader}
                    title="Liturgis"
                    icons="fad fa-user-music"
                  />
                  <Icon
                    disabled={!guru.assistant}
                    title="Asisten Mengajar"
                    icons="fad fa-user-plus"
                  />
                  <Icon
                    disabled={!guru.guitar}
                    title="Gitar"
                    icons="fas fa-guitar"
                  />
                  <Icon
                    disabled={!guru.keyboard}
                    title="Keyboard"
                    icons="fad fa-piano"
                  />
                  <Icon
                    disabled={!guru.cajon}
                    title="Cajon"
                    icons="fas fa-drum active"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Icon = (props) => {
  let colors = "#ff4db2";
  if (props.disabled) {
    colors = "Grey";
  }
  return (
    <div>
      <span
        title={props.title}
        style={{
          fontsize: "3em",
          color: colors,
          marginInline: "3px",
        }}
      >
        <i className={props.icons}></i>
      </span>
    </div>
  );
};
export default GridGSM;
