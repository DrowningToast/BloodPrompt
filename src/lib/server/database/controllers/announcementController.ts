import prisma, { Prisma } from '..';

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
	}
};
