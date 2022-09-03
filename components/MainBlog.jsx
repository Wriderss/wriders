import React from "react";
import Image from "next/image";

const MainBlog = () => {
  return (
    <div className="w-[60%]">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Image src="/arrow.svg" alt="arrow" height={30} width={60} />
        </div>
        <h1 className="font-bold text-3xl">
          Nature's Valley and it's preservance
        </h1>
      </div>
      <p className="mt-4 w-[97%] mx-auto">
        A number of years ago I went on holiday to a beautiful part of Portugal.
        We stayed in a converted farmhouse in the middle of a national park. The
        farmhouse was in a valley. We arrived in the evening when the birds were
        just starting to roost. It was still warm and the air smelled sweet with
        pollen. You could hear the hum of crickets. A small river flowed through
        that valley. We opened a rickety gate and crossed a small wooden bridge.
        As we walked along the narrow path that led to our house I had a clear
        vision of what my morning routine would be like for the next fourteen
        days. I had been working hard for the last few months and I felt tired.
        I wanted this holiday to be a mini retreat. I would wake up early each
        day when it was still quite cool and I would meditate for a while. I
        imagined myself sitting in a peaceful spot, my mind calm, my body
        relaxed… listening to the river flowing, hearing the birds and wildlife
        starting to stir, feeling the first rays of the early morning sun hit my
        face as it rose over the top of the hill. Present. Even as I write this
        now, it sounds like paradise to me. I work up early the next morning and
        it was just as I imagined it would be. There is nothing like the
        stillness of the early morning. There was a gentle, peaceful feeling
        that enveloped me. It didn’t come from me but seemed to come from the
        earth and the river and the mountains. Everything was clearer than
        usual. The mind wasn’t racing here and there the way it normally does. I
        had never been to this place before but it felt welcoming and familiar.
        I found a spot to sit quietly. I could hear the faint hum of insects.
        The air was very still and there was only an occasional gentle breeze. A
        fly landed on my face. After a moment or two I carefully lifted my hand
        and gently ushered him away. Then another fly landed on my face. And
        another. And another. The feeling I had experienced a few moments ago
        was gone. I endured thirty minutes or so of mild torture that first
        morning before I admitted defeat and retreated to the farmhouse.
      </p>
    </div>
  );
};

export default MainBlog;
