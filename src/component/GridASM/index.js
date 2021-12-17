import React, { useMemo } from "react";
import { Image, Transformation } from "cloudinary-react";

const GridASM = (props) => {
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
        {props.asm_class.map((anak) => (
          <div key={anak._id} className="col-md-3">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <Image
                    cloudName="alryntocloud"
                    upload_preset="smgtdepok"
                    publicId={anak.image}
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
                  {upper(anak.full_name)}
                </h3>
                <p className="text-muted text-center">Kelas {anak.class_sm}</p>
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
                      onClick={() => props.handleClickDetail(anak._id)}
                    >
                      <i className="fas fa-eye"></i>
                      Detail
                    </a>
                  </div>
                  <div>
                    <a
                      className="btn btn-danger"
                      onClick={() => props.handleClickEdit(anak._id)}
                    >
                      <i className="fas fa-pen"></i>
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridASM;
