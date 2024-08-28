import { AppDataSource } from "../data-source";
import Measure from "./measures.model";

class MeasureService {
	private readonly measuresRepository;
	constructor() {
		this.measuresRepository = AppDataSource.getRepository(Measure);
	}
}

export default MeasureService;
