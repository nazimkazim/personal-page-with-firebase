import React from 'react';
import GroupOfPeople from '../../Resources/images/StatIcons/group-of-people-in-a-formation.svg';
import International from '../../Resources/images/StatIcons/international.svg';
import Official from '../../Resources/images/StatIcons/official.svg';
import BookCover from '../../Resources/images/books_cover.jpg';

const RussianDetailed = () => {
  const reasons = [
    {
      ReasonTitle:
        'You are passionate about Russian classical literature and dream to read the works of Russian classics in the original',
      ReasonDesc:
        'Talented Russian writers - Bunin, Chekhov, Pushkin - are authors of amazing interesting literary works. The famous writings of Leo Tolstoy, Fyodor Dostoevsky and Nikolai Gogol convey the essence of the Russian soul. However, the Russian culture is known not only for its writers. Many brilliant musicians andsingers such like Oistrakh, Chaliapin, Tchaikovsky, and dozens others also came from Russia. The glory of Russian ballet and its stars Anna Pavlova, Mikhail Baryshnikov, and Rudolf Nureyev does not subside even today. Russian cultural heritage is widely known throughout the world and knowledge of the Russian language is a must to fully enjoy and understand it.'
    },
    {
      ReasonTitle:
        'You have heard a lot about the beauty and modesty of Russian women and want to find your destiny in Russia',
      ReasonDesc:
        'The amazing and mysterious Russian women have been the Muses of many great artists and writers. People have told legends about the beauty of Russian women, while the traditions and peculiarities of Russian upbringing shape their noble and modest character. Russian women make wonderful hosts and place great importance on family values. Many men from different countries of the world dream of having a Russian woman as a wife. Therefore, besides learning the language of love, it would be perfect to master the native language of your future "second half.'
    },
    {
      ReasonTitle:
        'You are aware of Russia’s lucrative investment opportunities and consider establishing a company in Russia',
      ReasonDesc:
        'If you are going on a business trip to Russia, you want to be prepared to communicate with your Russian business partners. Russian entrepreneurs are well-versed in international economics and willingly establish business relationships with partners from abroad. Russia is adequately represented in the international arena. Due to the size of the country and its natural resources, the Russian market is of great interest to foreign businessmen. And serious business requires a serious approach - the knowledge of the Russian language is a must for efficient communication with your new business partners.'
    },
    {
      ReasonTitle:
        'You are an ambitious traveller and Russia is the next stop on your travel list',
      ReasonDesc:
        'Many foreigners have set to travel across Russia at various times. Russia is a fascinating and exotic country. It occupies a vast territory offering plenty of opportunities to enjoy resort towns with spectacular beaches, experience the taiga with its diverse wildlife and unexplored places, visit the Russian Far East where the sun rises while people in the Western parts of the country are still fast asleep. There is so much to see and do in Russia, and speaking a little Russian will help you to meet all sorts of fascinating people and make the most of every moment.'
    },
    {
      ReasonTitle:
        'You know that life in Russia is very different from life in the West. You are interested in everything connected with the Russian way of life, habits and mentality',
      ReasonDesc:
        'Life in Russia is not quite the same as in the Western world. Everything from upbringing of children to family values to friends and relationships has its own flavor in Russia. The system of education (kindergartens, schools), health services, and work of various official organizations – all this is often radically different from what is common for the Western Europe, USA, Canada, Australia, or New Zealand. You will find it much easier to quench your thirst to all things Russian if you can speak and understand the Russian language.'
    }
  ];

  const statistics = [
    {
      StatHeader: 'Russian is Spoken by',
      StatNumber: '166 million',
      StatPic: GroupOfPeople
    },
    {
      StatHeader: 'Russian is Spoken In At least',
      StatNumber: '12 countries',
      StatPic: International
    },
    {
      StatHeader: 'Russian is Official in',
      StatNumber: '4 countries',
      StatPic: Official
    }
  ];
  return (
    <div className="container">
      <div className="has-text-centered">
        <h1 className="is-size-4 is-margin-top-large">Why Learn Russian</h1>
      </div>
      <div className="columns is-mobile">
        <div
          className="column is-three-fifths
is-offset-one-fifth"
        >
          <ul className="is-margin-top-small">
            {reasons.map(reason => (
              <React.Fragment>
                <li className="is-margin-top-small has-text-weight-bold">
                  {reason.ReasonTitle}
                </li>
                <p className="is-margin-top-small">{reason.ReasonDesc}</p>
              </React.Fragment>
            ))}
            <a href="http://masterrussian.com/beginninglessons/why_learn_russian.htm">
              Read more
            </a>
          </ul>

          <div className="has-text-centered">
            <h1 className="is-size-4 is-margin-top-large">
              Numbers about Russian
            </h1>
          </div>
          <div className="columns is-margin-top-small">
            {statistics.map(stat => (
              <div className="column">
                <div className="has-text-centered has-text-weight-semibold">
                  {stat.StatHeader}
                </div>
                <div className="is-flex is-horizontal-center">
                  <figure className="image is-128x128">
                    <img className="is-rounded" src={stat.StatPic} />
                  </figure>
                </div>
                <div className="has-text-centered has-text-weight-semibold">
                  {stat.StatNumber}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="columns is-mobile">
        <div
          className="column is-three-fifths
          is-offset-one-fifth"
        >
          <h2 className="is-size-4 has-text-centered is-margin-top-large">
            But Why Learn Russian with Me Anyway
          </h2>
          <p className="is-margin-top-small">
            I offer a structured, engaging and logical learning approach that
            will take you from a novice to professional level. To achive that I
            use various techniques and methods to make students speak starting
            from the first lesson. But one of the most important part of my
            teaching is material. In my teaching I use a communicative book
            called "Russian Souvenir" by Irina Mozelova. This book is organized
            so that a student moves quickly and smoothly in his/her learning
            process, by utilizing numerous input and output techniques, that
            stimulate and activate cognitive skills. Let me tell you about the
            book.
          </p>

          <div className="card-content is-flex is-horizontal-center">
            <figure class="image is-480x480">
              <img src={BookCover} />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RussianDetailed;
