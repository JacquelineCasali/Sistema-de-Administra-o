import { useContext, useState} from "react";
import "./processo.css";
import { useNavigate } from "react-router-dom";
import AreaDetalhe from "../Area/AreaDetalhe";
import ProcessoDetalhe from "./ProcessoDetalhe";
import Title from "../Title/Tlite";
import { CardContext } from "../../context/CardContext";

const Processo = () => {
  const {dados,areas,areaSelecionada, setAreaSelecionada} = useContext(CardContext);
  const navigate = useNavigate();

  const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 6;
  
    const totalPaginas = Math.ceil(dados.length / itensPorPagina);
    const inicioIndex = (paginaAtual - 1) * itensPorPagina;
    const processosPaginados = dados.slice(inicioIndex, inicioIndex + itensPorPagina);

  function ClickEdit(id) {
    navigate("/cadastrar/processo/" + id);
  }

  return (

    <>
        <div className="form-group">
        <Title text="Filtrar processos Por Àrea" theme={"h2"} />
    <select value={areaSelecionada} onChange={(e) => setAreaSelecionada(e.target.value)}>
          <option value="">Selecione uma Área</option>
          {areas.map((area) => (
                
            <AreaDetalhe key={area.id} area={area} />
          ))}
        </select> 
      </div>
      <Title text="Lista de Processos" theme={"h2"} />
    <div className="processos-container">
      
     

       {processosPaginados.length === 0 ? (
   <p>Sem Processo cadastrado nessa área</p>
      ) : (
        processosPaginados.map((processo) => (
          <ProcessoDetalhe key={processo.id} processo={processo}
            clickEdit={ClickEdit} 
              />
        ))
      )}  
      
    </div>
    <div className="pagination">
                <button
                    onClick={() => setPaginaAtual(paginaAtual - 1)}
                    disabled={paginaAtual === 1}
                >
                    Anterior
                </button>
                <span style={{display:"flex", alignItems:"center"}}>Página {paginaAtual} de {totalPaginas}</span>
                <button
                    onClick={() => setPaginaAtual(paginaAtual + 1)}
                    disabled={paginaAtual === totalPaginas || totalPaginas === 0}
                >
                    Próxima
                </button>
            </div>

    </>
  );
};

export default Processo;
