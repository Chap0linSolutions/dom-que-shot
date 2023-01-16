import { useState, useEffect } from "react";
import Background from "../../../components/Background";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import beer from '../../../assets/beer.png';
import './Category.css'
import AwaitingBanner from "../../../components/AwaitingBanner";


const categories: {name: string, color: string}[] = [
    {name: "Animais", color: "#3D1365"},
    {name: "Atores",  color: '#3C1A7D'},
    {name: "Cantores e Bandas", color: '#533D8B'},
    {name: "Celebridades brasileiras", color: "#857DB1"},
    {name: "Celebridades internacionais", color: "#B098C1"},
    {name: "Jogadores de futebol", color: "#8D69A2"},
    {name: "Personagens da Disney", color: "#72418C"},
    {name: "Personagens de desenho animado", color: "#67127C"}
]

interface CategoryProps {
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    turnVisibility: boolean;
}

export default function CategoryPage({setCategory, turnVisibility}: CategoryProps){
    
    const [selectedCategory, setSelectedCategory] = useState<string>(undefined);
    
    const selectCategory = (name : string) => {
        //console.log(`categoria selecionada: ${name}`);
        if(name !== selectedCategory){
            return setSelectedCategory(name);
        } setSelectedCategory(undefined);
    }    

    if(turnVisibility === true){
        return (
            <Background noImage>
                <Header infoPage={() => {console.log('Nada a declarar.')}}/>

                <p className="categoriesTitle">
                    Escolha uma categoria para o grupo:
                </p>
                <div className="categoriesDiv">
                    {categories.map(category => {
                        return ( 
                            <div 
                            onClick={() => selectCategory(category.name)}
                            key={category.name} 
                            className='category'
                            style={{
                                background: category.color,
                                border: (category.name === selectedCategory)? '5px solid #FF00B8' : 'none'
                            }}>
                                <p className="categoryName">
                                    {category.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="categoriesButton">
                    <Button onClick={() => setCategory(selectedCategory)} isDisabled={(selectedCategory)? false : true}>
                        Começar
                    </Button>
                </div>
            </Background>
        );
    }

    return (
        <Background>
          <Header infoPage={() => {console.log('Nada a declarar.')}}/>
          <div className="categoriesDiv awaiting">
            <AwaitingBanner
                icon={beer}
                firstText="Aguardando o jogador da vez largar do zap e escolher uma categoria..."
                secondText="eita Giovana, o forninho caiu"
                background="#3D1365"
                border="4px solid #800080"
            />
          </div>
        </Background>
    );
}