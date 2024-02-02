import React from 'react';

// Componente para exibir uma única música
const MusicCard = ({ music }) => (
    <div className="flex items-center bg-gray-800 p-4 my-2 rounded-md">
        <img src={music.image} alt={music.song} className="w-16 h-16 mr-4" />
        <div>
            <h3 className="text-xl font-bold">{music.song}</h3>
            <p className="text-green-600">{music.artist}</p>
        </div>
    </div>
);

export default MusicCard;
