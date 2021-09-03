import React from "react";

export const JournalEntry = () => {
  return (
    <div className='journal__entry pointer'>
      <div
        className='journal__entry-picture'
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg)",
        }}
      ></div>

      <div className='journal__entry-body'>
        <p className='journal__entry-title'>Un nuevo dia</p>
        <p className='journal__entry-content'>
          Dolore anim velit velit ut qui.
        </p>
      </div>

      <div className='journal__entry-date-box'>
        <span>Monday</span>
        <h4>24</h4>
      </div>
    </div>
  );
};
