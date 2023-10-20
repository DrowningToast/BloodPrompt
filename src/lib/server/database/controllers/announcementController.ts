import prisma, { Prisma } from '..';

export type AnnouncementControllerUpdateAnnouncementArgs = {
	filter: Prisma.AnnouncementsWhereUniqueInput;
	data: Prisma.AnnouncementsUpdateInput;
	include: Prisma.AnnouncementsInclude;
};

export const announcementsController = {
	getAnnouncements: async (filter?: Prisma.AnnouncementsWhereInput) => {
		const announcements = await prisma.announcements.findMany({
			where: filter,
			include: {
				Place: true
			}
		});
		return announcements;
	},
	getAnnouncement: async (filter: Prisma.AnnouncementsWhereUniqueInput) => {
		const announcement = await prisma.announcements.findUnique({
			where: filter,
			include: {
				Place: true
			}
		});
		return announcement;
	},
	update: async (args: AnnouncementControllerUpdateAnnouncementArgs) => {
		const { filter, data } = args;

		const existed = await prisma.announcements.findUnique({
			where: filter
		});

		if (!existed) {
			throw new Error('ANNOUNCEMENT_NOT_FOUND');
		}

		const updatedAnnouncement = await prisma.announcements.update({
			where: filter,
			data,
			include: {
				Place: true
			}
		});
		return updatedAnnouncement;
	}
};
