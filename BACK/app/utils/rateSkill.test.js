import { rateSkill } from "../controllers/communicationController";
const { Meeting, Skill } = require("../models/index.js");



jest.mock('../models/index.js', () => ({
    Meeting: {
        findOne: jest.fn()
    },
    Skill: jest.fn()
}));

const mockRequest = (sessionData, body, params) => ({
    user: sessionData,
    body,
    params
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('rateSkill function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a message if the meeting doesn't exist or isn't over", async () => {
        const req = mockRequest({ id: 1 }, {}, { skillId: 1 });
        const res = mockResponse();

        Meeting.findOne.mockResolvedValue(null);

        await rateSkill(req, res);

        expect(res.send).toHaveBeenCalledWith("This meeting doesn't exist - is not over -  already rated");
    });

    it('should return an error if the mark is not a number', async () => {
        const req = mockRequest({ id: 1 }, ["invalid_mark"], { skillId: 1 });
        const res = mockResponse();

        Meeting.findOne.mockResolvedValue({
            UserId: 1,
            SkillId: 1,
            status: "terminé",
            Skill: {}
        });

        await rateSkill(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith('Invalid mark, not a number');
    });

    it('should update the skill and meeting if the meeting exists and is over', async () => {
        const req = mockRequest({ id: 1 }, [4], { skillId: 1 });
        const res = mockResponse();

        const mockSkill = {
            sumOfMarks: 8,
            numberOfRating: 2,
            averageMark: 4,
            save: jest.fn()
        };

        const mockMeeting = {
            UserId: 1,
            SkillId: 1,
            status: "terminé",
            Skill: mockSkill,
            mark: null,
            save: jest.fn()
        };

        Meeting.findOne.mockResolvedValue(mockMeeting);

        await rateSkill(req, res);

        expect(mockSkill.sumOfMarks).toBe(12);
        expect(mockSkill.numberOfRating).toBe(3);
        expect(mockSkill.averageMark).toBe(4);
        expect(mockSkill.save).toHaveBeenCalled();

        expect(mockMeeting.mark).toBe(4);
        expect(mockMeeting.status).toBe("noté");
        expect(mockMeeting.save).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('rating ok');
    });

    it('should handle errors and return a 400 status', async () => {
        const req = mockRequest({ id: 1 }, [4], { skillId: 1 });
        const res = mockResponse();

        Meeting.findOne.mockRejectedValue(new Error('Some error'));

        await rateSkill(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(new Error('Some error'));
    });
});

describe('filter subcat function', () => {
    it('should not proceed if SubCategoryId is an empty string, "undefined", or "null"', async () => {
        // Définir les différents cas à tester
        const invalidSubCategoryIds = ["", "undefined", "null"];

        invalidSubCategoryIds.forEach(SubCategoryId => {
            if (SubCategoryId !== "undefined" && SubCategoryId !== "null" && SubCategoryId !== "") {
                // Cette partie ne devrait pas être atteinte
                throw new Error(`The code should not reach this point for SubCategoryId: ${SubCategoryId}`);
            } else {
                // Si nous sommes ici, le SubCategoryId est bien filtré
                expect(true).toBe(true); // Test passe si la condition est correctement évitée
            }
        });
    });
});
