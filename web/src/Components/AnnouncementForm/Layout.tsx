import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToogleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { AnnoucementInput } from "./components/AnnoucementInput";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Game } from "../../types";
import axios from "axios";

export const Layout = (): JSX.Element => {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) =>
      setGames(response.data)
    );
  }, []);

  async function handleCreatedAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourStart,
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anúncio criado com sucesso!");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar o anúncio");
    }
  }

  return (
    <form onSubmit={handleCreatedAd} className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="game" className="font-semibold ">
          Qual o game?
        </label>
        <select
          id="game"
          name="game"
          className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
          defaultValue=""
        >
          <option disabled value="">
            Selecione o game que deseja jogar
          </option>
          {games.map((game) => {
            return (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name">Seu nome (ou nickname)</label>
        <AnnoucementInput
          id="name"
          name="name"
          placeholder="Como te chamam dentro do game?"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
          <AnnoucementInput
            id="yearsPlaying"
            name="yearsPlaying"
            type="number"
            placeholder="Tudo bem ser ZERO"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="discord">Qual seu discord?</label>
          <AnnoucementInput
            id="discord"
            name="discord"
            type="text"
            placeholder="Usuário#0000"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="weelDays">Qunado costuma jogar?</label>

          <ToogleGroup.Root
            type="multiple"
            className="grid grid-cols-4 gap-2"
            value={weekDays}
            onValueChange={setWeekDays}
          >
            <ToogleGroup.Item
              value="0"
              title="Domingo"
              className={`w-8 h-8 roundesd  ${
                weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
              }`}
            >
              D
            </ToogleGroup.Item>
            <ToogleGroup.Item
              value="1"
              title="Segunda"
              className={`w-8 h-8 roundesd ${
                weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
              }`}
            >
              S
            </ToogleGroup.Item>
            <ToogleGroup.Item
              value="2"
              title="Terça"
              className={`w-8 h-8 roundesd ${
                weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
              }`}
            >
              T
            </ToogleGroup.Item>
            <ToogleGroup.Item
              value="3"
              title="Quarta"
              className={`w-8 h-8 roundesd ${
                weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
              }`}
            >
              Q
            </ToogleGroup.Item>
            <ToogleGroup.Item
              value="4"
              title="Quinta"
              className={`w-8 h-8 roundesd ${
                weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
              }`}
            >
              Q
            </ToogleGroup.Item>
            <ToogleGroup.Item
              value="5"
              title="Sexta"
              className={`w-8 h-8 roundesd ${
                weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
              }`}
            >
              S
            </ToogleGroup.Item>
            <ToogleGroup.Item
              value="6"
              title="Sábado"
              className={`w-8 h-8 roundesd ${
                weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
              }`}
            >
              S
            </ToogleGroup.Item>
          </ToogleGroup.Root>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="hourStart">Qual o horário do dia ?</label>
          <div className="grid grid-cols-2 gap-2">
            <AnnoucementInput
              id="hourStart"
              name="hourStart"
              type="time"
              placeholder="De"
            />
            <AnnoucementInput
              id="hourEnd"
              name="hourEnd"
              type="time"
              placeholder="Até"
            />
          </div>
        </div>
      </div>

      <label className="mt-2 flex items-center gap-2 text-sm">
        <Checkbox.Root
          checked={useVoiceChannel}
          onCheckedChange={(checked) => {
            if (checked === true) {
              setUseVoiceChannel(true);
            } else {
              setUseVoiceChannel(false);
            }
          }}
          className="w-6 h-6 p-1 rounded bg-zinc-900"
        >
          <Checkbox.Indicator>
            <Check className="w-4 h-4 text-emerald-400" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        Costumo me conectar ao chat de voz
      </label>

      <footer className="mt-4 flex justify-end gap-4">
        <Dialog.Close
          type="button"
          className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
        >
          Cancelar
        </Dialog.Close>
        <button
          type="submit"
          className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
        >
          <GameController className="w-6 h-6" />
          Encontrar duo
        </button>
      </footer>
    </form>
  );
};
