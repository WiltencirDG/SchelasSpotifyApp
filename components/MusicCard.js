import Image from 'next/image';
import React from 'react';

// Componente para exibir uma única música
const MusicCard = ({ music }) => (
    <div className="flex items-center text-white bg-black hover:bg-hover p-4 my-2 rounded-md">
        <Image width={64} height={64} src={music.image} alt={music.song} className="w-16 h-16 mr-4" />
        <div>
            <h3 className="text-xl font-bold">{music.song}</h3>
            <p className="text-green-600">{music.artist}</p>
        </div>
    </div>
);

export default MusicCard;
