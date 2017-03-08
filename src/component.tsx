import * as React from "react";
import PeriodPicker from "react-bootstrap-period-picker/src/period-picker";

interface IPickerProps {
	dateStart?: string;
	dateEnd?: string;
	minDateStart?: string;
	maxDateEnd?: string;
}

interface IPickerState {
	dateStart: string;
	dateEnd: string;
}

const translations = {
	"Today": "Dzisiaj",
	"Yesterday": "Wczoraj",
	"Last 7 days": "Ostatnie 7 dni",
	"Last 30 days": "Ostatnie 30 dni",
	"Apply": "Zastosuj"
	// etc
};

export default class Component extends React.PureComponent<IPickerProps, IPickerState> {
	public constructor(props: IPickerProps) {
		super(props);

		this.state = {
			dateStart: props.dateStart,
			dateEnd: props.dateEnd
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				<PeriodPicker
					id="period-picker"
					locale="pl"
					from={this.state.dateStart}
					to={this.state.dateEnd}
					minFrom={this.props.minDateStart}
					maxTo={this.props.maxDateEnd}
					placeholder={"Wybierz okres"}
					translator={this.translate}
					onChange={this.onPeriodChange}
				/>

				<p style={{marginTop: "3em"}}>To równie dobrze mogą być hidden inputy.</p>
				<p>Początek: <input type="text" readOnly name="dateStart" value={this.state.dateStart} /></p>
				<p>Koniec: <input type="text" readOnly name="dateEnd" value={this.state.dateEnd} /></p>
			</div>
		);
	}

	private onPeriodChange = (dateStart: string, dateEnd: string): void => {
		this.setState({ dateStart, dateEnd });
	}

	private translate = (msg: string): string => {
		return translations[msg] || msg;
	}
}
